const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  eventID:   { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  senderID:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
