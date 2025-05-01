// backend/controllers/authController.js
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('../models/User');
const { JWT_SECRET } = require('../config/env');

console.log('🔑 authController loaded, using secret:', JWT_SECRET);

const generateToken = (user) => {
  console.log('🔑 Signing token with secret:', JWT_SECRET);
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user._id, role: user.role, email: user.email }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });
    const token = generateToken(newUser);
    return res.status(201).json({
      token,
      user: { id: newUser._id, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    console.error('❌ Registration error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser, registerUser };
