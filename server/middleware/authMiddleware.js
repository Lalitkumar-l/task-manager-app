// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
