const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const paymentRoutes = require('./routes/paymentRoutes');
const videoRoutes = require('./routes/videoRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/payments', paymentRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/organizer', organizerRoutes);
app.use('/api/attendee', attendeeRoutes);
app.use('/api/auth', authRoutes); // ✅ mounted it

// Global error handler
app.use(errorHandler);

module.exports = app;
