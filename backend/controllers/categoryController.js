
import db from "../config/db.js";

export const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const userId = req.user.id;

    await db.execute(
      `INSERT INTO categories (category_name, user_id)
       VALUES (?, ?)`,
      [category_name, userId]
    );

    res.json({
      success: true,
      message: "Category Added"
    });

  } catch (err) {
    console.log("ADD CATEGORY ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {

    const userId = req.user.id;

    const [rows] = await db.execute(
      `SELECT * FROM categories
       WHERE user_id = ?`,
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.log("GET CATEGORY ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateCategory = async (req, res) => {
  try {

    const userId = req.user.id;

    const [result] = await db.execute(
      `UPDATE categories
       SET category_name = ?
       WHERE id = ? AND user_id = ?`,
      [
        req.body.category_name,
        req.params.id,
        userId
      ]
    );

    res.json({
      success: true,
      message: "Updated"
    });

  } catch (err) {
    res.status(500).json(err);
  }
};


export const changeStatus = async (req, res) => {
  try {

    const userId = req.user.id;

    await db.execute(
      `UPDATE categories
       SET status = ?
       WHERE id = ? AND user_id = ?`,
      [
        req.body.status,
        req.params.id,
        userId
      ]
    );

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (err) {

    console.log("STATUS UPDATE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

export const deleteCategory = async (req, res) => {
  try {

    const userId = req.user.id;

    await db.execute(
      `DELETE FROM categories
       WHERE id = ? AND user_id = ?`,
      [
        req.params.id,
        userId
      ]
    );

    res.json({
      success: true,
      message: "Category Deleted"
    });

  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateCategoryStatus = async (req, res) => {
  try {

    const userId = req.user.id;
    const { status } = req.body;

    await db.execute(
      `UPDATE categories
       SET status = ?
       WHERE id = ? AND user_id = ?`,
      [
        status,
        req.params.id,
        userId
      ]
    );

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};