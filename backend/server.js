import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import billRoutes from "./routes/billRoutes.js";

dotenv.config();

const app = express();
const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Request Logger
app.use((req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.url}`);
  next();
});


app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/bills", billRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hotel Billing API Running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});