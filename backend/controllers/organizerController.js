// backend/controllers/organizerController.js

const Event = require('../models/Event');

// this will help us verify that req.user really exists
console.log('📋 organizerController loaded');

// backend/controllers/organizerController.js
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    const roomName = Date.now().toString(); // or any unique string
    const sessionLink = `https://meet.jit.si/${roomName}`;
    const event = await Event.create({
      title,
      description,
      date,
      organizerId: req.user.id,
      sessionLink
    });
    return res.status(201).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};


exports.getMyEvents = async (req, res, next) => {
  console.log('👤 getMyEvents called, req.user =', req.user);

  try {
    // find only events where organizerId matches your token’s user id
    const events = await Event.find({ organizerId: req.user.id });
    console.log(`📦 Found ${events.length} events for organizer ${req.user.id}`);
    return res.json({ success: true, events });
  } catch (err) {
    console.warn('❌ Error in getMyEvents:', err);
    next(err);
  }
};
