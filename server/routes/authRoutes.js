// server/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
