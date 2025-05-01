// server/routes/analytics.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Chat = require('../models/Chat');
// You can add other models as needed

// Example: Get analytics for events
router.get('/events', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalChats = await Chat.countDocuments();
    // Add other metrics (like poll responses, ticket sales, etc.)
    res.json({ totalEvents, totalChats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
