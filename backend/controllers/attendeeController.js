// backend/controllers/attendeeController.js
const Event = require('../models/Event');

exports.getAllEvents = async (req, res, next) => {
  try {
    const all = await Event.find().lean();
    const userId = req.user.id;

    const events = all.map(e => ({
      id:          e._id,
      title:       e.title,
      description: e.description,
      date:        e.date,
      sessionLink: e.sessionLink,
      isRegistered: e.attendees?.some(a => a.toString() === userId) || false,
      hasPaid:      e.paidAttendees?.some(p => p.toString() === userId) || false,
    }));

    return res.json({ success: true, events });
  } catch (err) {
    next(err);
  }
};


exports.registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // only push once
    if (!event.attendees.some(id => id.toString() === userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    return res.json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    next(err);
  }
};


exports.payForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // must have registered first
    if (!event.attendees.some(id => id.toString() === userId)) {
      return res.status(400).json({ success: false, message: 'Please register before paying' });
    }

    // if not already paid, mark paid
    if (!event.paidAttendees.some(id => id.toString() === userId)) {
      event.paidAttendees.push(userId);
      await event.save();
    }

    return res.json({ success: true, message: 'Payment recorded' });
  } catch (err) {
    next(err);
  }

};
