const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveChatMessage, getChatMessages } = require('../controllers/chatController');

router.post('/', auth, saveChatMessage);
router.get('/:eventID', auth, getChatMessages);

module.exports = router;
