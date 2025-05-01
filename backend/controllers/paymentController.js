const PaymentTransaction = require('../models/PaymentTransaction');
const PaymentService = require('../services/PaymentService');

exports.initiatePayment = async (req, res, next) => {
  try {
    const { amount, eventId } = req.body;
    const session = await PaymentService.createPaymentSession({ amount, eventId });
    const paymentRecord = await PaymentTransaction.create({
      eventId,
      amount,
      status: 'initiated'
    });
    return res.status(200).json({
      success: true,
      session,
      paymentRecord
    });
  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { transactionId, paymentStatus } = req.body;
    const paymentRecord = await PaymentTransaction.findById(transactionId);
    paymentRecord.status = paymentStatus;
    await paymentRecord.save();
    return res.status(200).json({ success: true, paymentRecord });
  } catch (err) {
    next(err);
  }
};
