const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  date:        { type: Date, required: true },
  time:        { type: String, required: true },
  agenda:      { type: String },
  organizerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
