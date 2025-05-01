const mongoose = require('mongoose');

const paymentTxSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  status: { type: String, default: 'initiated' }
}, { timestamps: true });

module.exports = mongoose.model('PaymentTransaction', paymentTxSchema);
