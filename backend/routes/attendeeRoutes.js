// backend/routes/attendeeRoutes.js
const express         = require('express');
const router          = express.Router();
const authMiddleware  = require('../middlewares/authMiddleware');
const {
  getAllEvents,
  registerForEvent,
  payForEvent
} = require('../controllers/attendeeController');

router.get(
  '/events',
  authMiddleware,
  getAllEvents
);

router.post(
  '/register',
  authMiddleware,
  registerForEvent
);

router.post(
  '/pay/:eventId',
  authMiddleware,
  payForEvent
);

module.exports = router;
