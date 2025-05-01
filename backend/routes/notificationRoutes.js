const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/email', notificationController.sendEmailNotification);
router.post('/push', notificationController.sendPushNotification);

module.exports = router;
