// client/src/features/dashboard/organizer/MyEvents.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/GlobalStyles.css';

const MyEvents = () => {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/organizer/my-events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(res.data.events);
      } catch {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Manage Events</h2>
        {loading
          ? <p>Loading…</p>
          : error
            ? <p style={{ color: 'red' }}>{error}</p>
            : events.length > 0
              ? <ul>
                  {events.map(e => (
                    <li key={e._id}>
                      <strong>{e.title}</strong> —
                      <Link to={`/organizer/dashboard`} style={{ marginLeft: '0.5rem' }}>
                        Back to Dashboard
                      </Link>
                    </li>
                  ))}
                </ul>
              : <p>No events yet.</p>
        }
        <Link to="/organizer/create-event">
          <button className="btn" style={{ marginTop: '1rem' }}>Create Your First Event</button>
        </Link>
      </div>
    </div>
  );
};

export default MyEvents;
