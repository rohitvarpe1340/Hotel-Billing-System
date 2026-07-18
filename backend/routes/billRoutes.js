import express from "express";

import {
  generateBill,
  getBillHistory,
  downloadBill
} from "../controllers/billController.js";

const router = express.Router();

router.post("/generate", generateBill);

router.get("/history", getBillHistory);

router.get("/download/:id", downloadBill);

export default router;