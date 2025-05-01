const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createEvent, getEvents } = require('../controllers/eventController');

router.post('/', auth, createEvent);
router.get('/', getEvents);

module.exports = router;
