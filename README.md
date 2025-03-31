# Virtual Event Platform

This project is a Virtual Event Platform featuring secure user registration/authentication, event creation/management, real-time chat and polling, and optional live video integration.

## Features

- **User Management:** Registration, login, and profile updates with JWT-based authentication.
- **Event Management:** Organizers can create and update events.
- **Real-Time Interaction:** Live chat using Socket.io; live polls and Q&A.
- **Analytics Dashboard:** Organizers can view event analytics.
- **Responsive UI:** Built with React and Material-UI/Tailwind/Bootstrap (your choice).
- **Security & Performance:** Secure API endpoints and optimized performance.
- **Optional:** WebRTC integration for live video events.

## Getting Started

### Server

1. Navigate to the `server` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file (if needed) and configure your MongoDB connection string and JWT secret.
4. Start the server with `npm start`.

### Client

1. Navigate to the `client` folder.
2. Run `npm install` to install dependencies.
3. Start the client with `npm start`.

## Deployment

Use Docker or deploy to platforms like Heroku, AWS, or DigitalOcean.
