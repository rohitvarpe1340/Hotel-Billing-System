import express from "express";
import verifyToken from "../middleware/authMiddleware.js"; 

import {
  addCategory,
  getCategories,
  updateCategory,
  updateCategoryStatus,
  changeStatus,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", verifyToken, addCategory);
router.get("/", verifyToken, getCategories);
router.put("/:id", verifyToken, updateCategory);
router.put("/status/:id", verifyToken, updateCategoryStatus);
router.put("/change-status/:id", verifyToken, changeStatus);
router.delete("/:id", verifyToken, deleteCategory);

export default router;