import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import TicketPurchase from './pages/TicketPurchase';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import LiveVideo from './pages/LiveVideo';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/ticket-purchase" element={<TicketPurchase />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/live-video" element={<LiveVideo />} />
      </Routes>
    </div>
  );
}

export default App;
