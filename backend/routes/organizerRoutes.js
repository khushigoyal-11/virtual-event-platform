const express = require('express');
const router = express.Router();
const { createEvent, getMyEvents } = require('../controllers/organizerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-event', authMiddleware, createEvent);
router.get('/my-events', authMiddleware, getMyEvents);

module.exports = router;
