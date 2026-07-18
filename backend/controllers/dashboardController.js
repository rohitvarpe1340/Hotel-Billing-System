import  db from "../config/db.js";

export const getDashboardStats = async (req, res) => {

  try {

    const [sales] = await db.query(`
      SELECT IFNULL(SUM(total_amount),0) AS totalSales
      FROM bills
    `);

    const [orders] = await db.query(`
      SELECT COUNT(*) AS totalOrders
      FROM bills
    `);

    const [menuItems] = await db.query(`
      SELECT COUNT(*) AS totalMenuItems
      FROM menu_items
    `);

    const [categories] = await db.query(`
      SELECT COUNT(*) AS totalCategories
      FROM categories
    `);

    const [daily] = await db.query(`
      SELECT IFNULL(SUM(total_amount),0) AS dailySales
      FROM bills
      WHERE DATE(created_at)=CURDATE()
    `);

    const [weekly] = await db.query(`
      SELECT IFNULL(SUM(total_amount),0) AS weeklySales
      FROM bills
      WHERE YEARWEEK(created_at,1)=YEARWEEK(CURDATE(),1)
    `);

    const [monthly] = await db.query(`
      SELECT IFNULL(SUM(total_amount),0) AS monthlySales
      FROM bills
      WHERE MONTH(created_at)=MONTH(CURDATE())
      AND YEAR(created_at)=YEAR(CURDATE())
    `);

    res.status(200).json({

      totalSales:
        sales[0].totalSales,

      totalOrders:
        orders[0].totalOrders,

      totalMenuItems:
        menuItems[0].totalMenuItems,

      totalCategories:
        categories[0].totalCategories,

      dailySales:
        daily[0].dailySales,

      weeklySales:
        weekly[0].weeklySales,

      monthlySales:
        monthly[0].monthlySales

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

export default {
  getDashboardStats
};