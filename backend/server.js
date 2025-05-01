// backend/server.js
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const authRoutes      = require('./routes/authRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const attendeeRoutes  = require('./routes/attendeeRoutes');
const errorHandler    = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// ─── Replace the ellipsis with your real connection string ───
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB Connected:', mongoose.connection.host))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── mount your routers ───
app.use('/api/auth',      authRoutes);
app.use('/api/organizer', organizerRoutes);
app.use('/api/attendee',  attendeeRoutes);

// ─── your global error handler ───
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
