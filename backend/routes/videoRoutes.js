const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/initiate', videoController.initiateVideoSession);

module.exports = router;
