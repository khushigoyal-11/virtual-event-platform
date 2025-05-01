const NotificationService = require('../services/NotificationService');

exports.sendEmailNotification = async (req, res, next) => {
  try {
    const { to, subject, message } = req.body;
    await NotificationService.sendEmail({ to, subject, message });
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.sendPushNotification = async (req, res, next) => {
  try {
    const { to, title, body } = req.body;
    await NotificationService.sendPush({ to, title, body });
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
