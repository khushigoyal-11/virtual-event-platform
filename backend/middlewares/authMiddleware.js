// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

console.log("🔐 authMiddleware loaded, using secret:", JWT_SECRET);

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Received Auth Header:", authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verify error:", err.message);
    return res.status(401).json({ message: 'Token invalid or expired.' });
  }
};
