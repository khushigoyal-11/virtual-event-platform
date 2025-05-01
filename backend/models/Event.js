// backend/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionLink: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  paidAttendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],    // ← NEW
});

module.exports = mongoose.model('Event', EventSchema);
