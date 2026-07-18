import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import upload from "../uploads/multerConfig.js";

const router = express.Router();


router.post("/register", upload.single("profile"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email=?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //const profileImage = req.file ? req.file.filename : null;
    const profileImage = req.file ? req.file.buffer : null;

    await db.execute(
      `INSERT INTO users(name,email,password,profile_image)
       VALUES(?,?,?,?)`,
      [name, email, hashPassword, profileImage]
    );

    return res.status(201).json({
      success: true,
      message: "Registration Successful"
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({
      message: error.message
    });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [result] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Convert image Buffer to Base64
    const profileImage = user.profile_image
      ? Buffer.from(user.profile_image).toString("base64")
      : null;

    return res.status(200).json({
      success: true,
      message: "Login Success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: profileImage
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;