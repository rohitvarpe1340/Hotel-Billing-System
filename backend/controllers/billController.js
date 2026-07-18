
import  PDFDocument from "pdfkit";
import  db from "../config/db.js";

export const downloadBill = async (req, res) => {
  try {
    const billId = req.params.id;

    // Fetch Bill
    const [billRows] = await db.query(
      "SELECT * FROM bills WHERE id = ?",
      [billId]
    );

    if (billRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    const bill = billRows[0];

    // Fetch Bill Items
    const [items] = await db.query(
      `SELECT bi.quantity,
              m.item_name,
              m.price
       FROM bill_items bi
       JOIN menu_items m
       ON bi.menu_item_id = m.id
       WHERE bi.bill_id = ?`,
      [billId]
    );

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      margin: 40
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Bill_${billId}.pdf`
    );

    doc.pipe(res);

    // Header
    doc
      .fontSize(22)
      .text("Hotel Achanak", { align: "center" });

    doc
      .fontSize(12)
      .text("Babhaleshwar, Rahata, Ahilyanagar", {
        align: "center"
      });

    doc.moveDown(2);

    // Bill Details
    doc.fontSize(12);
    doc.text(`Bill ID : ${bill.id}`);
    doc.text(`Customer Name : ${bill.customer_name}`);
    doc.text(`Mobile : ${bill.customer_mobile}`);
    doc.text(
      `Date : ${new Date(bill.created_at).toLocaleDateString()}`
    );

    doc.moveDown();

    // Table Header
    let y = doc.y;

    doc.font("Helvetica-Bold");
    doc.text("Item", 50, y);
    doc.text("Qty", 220, y);
    doc.text("Price", 300, y);
    doc.text("Total", 420, y);

    doc.moveTo(50, y + 18)
       .lineTo(550, y + 18)
       .stroke();

    y += 30;

    doc.font("Helvetica");

    let grandTotal = 0;

    items.forEach((item) => {

      const total = Number(item.price) * Number(item.quantity);

      grandTotal += total;

      doc.text(item.item_name, 50, y);
      doc.text(item.quantity.toString(), 220, y);
      doc.text(`Rs. ${Number(item.price).toFixed(2)}`, 300, y);
      doc.text(`Rs. ${total.toFixed(2)}`, 420, y);

      y += 25;
    });

    doc.moveTo(50, y)
       .lineTo(550, y)
       .stroke();

    y += 20;

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(
        `Grand Total : Rs. ${grandTotal.toFixed(2)}`,
        320,
        y
      );

    doc.end();

  } catch (error) {
    console.log(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  }
};


export const generateBill = async (req, res) => {

  try {

    const {
      customer_name,
      customer_mobile,
      items
    } = req.body;

    if (!customer_name || !customer_mobile) {
      return res.status(400).json({
        success: false,
        message: "Customer name & mobile required"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items selected"
      });
    }

    let total = 0;

    for (const item of items) {

      const [menu] = await db.execute(
        `SELECT price FROM menu_items WHERE id=?`,
        [item.menu_item_id]
      );

      if (menu.length === 0) continue;

      total += menu[0].price * item.quantity;
    }

    // INSERT BILL
    const [billResult] = await db.execute(
      `INSERT INTO bills (customer_name, customer_mobile, total_amount)
       VALUES (?,?,?)`,
      [
        customer_name,
        customer_mobile,
        total
      ]
    );

    const billId = billResult.insertId;

    // INSERT ITEMS
    for (const item of items) {

      const [menu] = await db.execute(
        `SELECT price FROM menu_items WHERE id=?`,
        [item.menu_item_id]
      );

      if (menu.length === 0) continue;

      await db.execute(
        `INSERT INTO bill_items
        (bill_id, menu_item_id, quantity, price)
        VALUES (?,?,?,?)`,
        [
          billId,
          item.menu_item_id,
          item.quantity,
          menu[0].price
        ]
      );

    }

    res.status(200).json({
      success: true,
      message: "Bill Generated Successfully",
      billId,
      total
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const getBillHistory = async (req, res) => {

  try {

    const [rows] = await db.query(
      'SELECT * FROM bills ORDER BY id DESC'
    );

    res.status(200).json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

};