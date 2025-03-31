require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/polls', require('./routes/polls'));

// Error Handling Middleware
app.use(errorHandler);

// Create HTTP server and setup Socket.io
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" }
});

// Socket.io events
io.on('connection', (socket) => {
  logger.info('New client connected: ' + socket.id);

  // Chat event
  socket.on('chatMessage', (data) => {
    // Broadcast chat message to room or globally
    io.emit('chatMessage', data);
  });

  // Poll update event
  socket.on('pollUpdate', (data) => {
    io.emit('pollUpdate', data);
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected: ' + socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
