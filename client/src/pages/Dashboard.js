// client/src/pages/Dashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Assume the role is stored in localStorage (set after login)
  const role = localStorage.getItem('role'); // 'organizer' or 'attendee'

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      {token ? (
        <>
          {role === 'organizer' ? (
            <>
              <button onClick={() => navigate('/create-event')}>Create Event</button>
              <button onClick={() => navigate('/analytics')}>View Analytics</button>
              <button onClick={() => navigate('/events')}>Manage Events</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/events')}>View Events</button>
              <button onClick={() => navigate('/ticket-purchase')}>Buy Tickets</button>
            </>
          )}
          <button onClick={() => {
            localStorage.removeItem('role');
            window.location.reload();
          }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
