import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/GlobalStyles.css';

const OrganizerDashboard = () => {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res   = await axios.get(
          '/api/organizer/my-events',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvents(res.data.events);
        setError(null);
      } catch {
        setError('Failed to fetch your events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Organizer Dashboard</h2>
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : events.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem'
          }}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Registrations</th>
              </tr>
            </thead>
            <tbody>
              {events.map(evt => {
                const dt = new Date(evt.date);
                return (
                  <tr key={evt.id}>
                    <td style={tdStyle}>{evt.title}</td>
                    <td style={tdStyle}>{dt.toLocaleDateString()}</td>
                    <td style={tdStyle}>{dt.toLocaleTimeString()}</td>
                    <td style={tdStyle}>{evt.attendees.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// simple shared styles
const thStyle = {
  textAlign: 'left',
  padding: '0.5rem',
  borderBottom: '1px solid #444'
};
const tdStyle = {
  padding: '0.5rem 0.5rem',
  borderBottom: '1px solid #333'
};

export default OrganizerDashboard;
