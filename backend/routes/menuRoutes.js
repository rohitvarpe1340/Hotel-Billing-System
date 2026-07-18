
import express from "express";

import {
  addItem,
  getMenu,
  updateItem,
  changeItemStatus,
  deleteItem
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/", addItem);

router.get("/", getMenu);

router.put("/:id", updateItem);

router.put("/status/:id", changeItemStatus);

router.delete("/:id", deleteItem);

export default router;