// server/routes/razorpay.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// Initialize Razorpay instance with your keys
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create an order
router.post('/create-order', async (req, res) => {
  // Expect amount (in INR) in the request body, e.g., 500 (for Rs. 500)
  const { amount, currency = "INR", receipt } = req.body;

  // Razorpay expects amount in the smallest currency unit (paise)
  const options = {
    amount: amount * 100, // convert INR to paise
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
    payment_capture: 1, // Auto-capture payment
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
