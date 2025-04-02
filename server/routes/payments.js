const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order for payment
router.post('/create-order', async (req, res) => {
  try {
    const { eventName, ticketPrice, quantity } = req.body;
    const amount = ticketPrice * quantity * 100; // Convert to paisa

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount, currency: "INR" });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
