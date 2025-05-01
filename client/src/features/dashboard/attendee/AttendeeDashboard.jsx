// client/src/features/dashboard/attendee/AttendeeDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../styles/GlobalStyles.css';

const AttendeeDashboard = () => {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res   = await axios.get('/api/attendee/events', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setEvents(res.data.events);
      setError(null);
    } catch {
      setError('Unable to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleRegister = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/attendee/register',
        { eventId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
    } catch {
      alert('Registration failed.');
    }
  };

  const handlePay = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/attendee/pay/${id}`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
    } catch {
      alert('Payment failed.');
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color:'red' }}>{error}</p>;

  // split out by status
  const upcoming   = events.filter(e => !e.isRegistered);
  const registered = events.filter(e => e.isRegistered && !e.hasPaid);
  const paid       = events.filter(e => e.hasPaid);

  return (
    <div className="container">
      <div className="card">

        <h2>Upcoming Events</h2>
        {upcoming.length === 0
          ? <p>No upcoming events.</p>
          : <ul style={{ listStyle:'none', padding:0 }}>
              {upcoming.map(evt => (
                <li key={evt.id} style={{ marginBottom:'1rem' }}>
                  <strong>{evt.title}</strong><br/>
                  <small>{new Date(evt.date).toLocaleString()}</small><br/>
                  <button className="btn" onClick={()=>handleRegister(evt.id)}>
                    Register
                  </button>
                </li>
              ))}
            </ul>
        }

        <h2 style={{ marginTop:'2rem' }}>Pending Payment</h2>
        {registered.length === 0
          ? <p>No registrations pending payment.</p>
          : <ul style={{ listStyle:'none', padding:0 }}>
              {registered.map(evt => (
                <li key={evt.id} style={{ marginBottom:'1rem' }}>
                  <strong>{evt.title}</strong><br/>
                  <small>{new Date(evt.date).toLocaleString()}</small><br/>
                  <button className="btn" onClick={()=>handlePay(evt.id)}>
                    Pay Now
                  </button>
                </li>
              ))}
            </ul>
        }

        <h2 style={{ marginTop:'2rem' }}>Registered &amp; Paid</h2>
        {paid.length === 0
          ? <p>No paid events yet.</p>
          : <ul style={{ listStyle:'none', padding:0 }}>
              {paid.map(evt => (
                <li key={evt.id} style={{ marginBottom:'1rem' }}>
                  <strong>{evt.title}</strong><br/>
                  <small>{new Date(evt.date).toLocaleString()}</small><br/>
                  <Link
                    to={`/join?link=${encodeURIComponent(evt.sessionLink)}`}
                  >
                    <button className="btn">Join Session</button>
                  </Link>
                </li>
              ))}
            </ul>
        }

      </div>
    </div>
  );
};

export default AttendeeDashboard;
