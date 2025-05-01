const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPoll, votePoll } = require('../controllers/pollController');

router.post('/', auth, createPoll);
router.post('/vote', auth, votePoll);

module.exports = router;
