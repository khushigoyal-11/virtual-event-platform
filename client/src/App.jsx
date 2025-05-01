// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home       from './pages/Home'
import Login      from './pages/Login';
import Register   from './pages/Register';
import AttendeeDashboard from './features/dashboard/attendee/AttendeeDashboard';
import OrganizerDashboard from './features/dashboard/organizer/OrganizerDashboard';
// (If you have auth-protected routes, wrap them in a <RequireAuth> component)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/attendee/dashboard"  element={<AttendeeDashboard />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
