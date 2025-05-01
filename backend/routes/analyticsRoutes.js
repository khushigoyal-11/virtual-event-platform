const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/basic-stats', analyticsController.getBasicStats);

module.exports = router;
