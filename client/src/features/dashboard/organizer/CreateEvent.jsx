// client/src/features/organizer/CreateEvent.jsx
import React, { useState } from 'react';
import axios          from 'axios';
import '../../../styles/GlobalStyles.css';

const CreateEvent = () => {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate]             = useState('');
  const [error, setError]           = useState(null);
  const [success, setSuccess]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/organizer/create-event',          // ← relative URL
        { title, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setError(null);
      setTitle(''); setDescription(''); setDate('');
    } catch (err) {
      setError(err.response?.data.message || 'Error creating event');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={e => setDescription(e.target.value)} required/>
          </label>
          <label>
            Date &amp; Time
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
          </label>
          <button type="submit" className="btn">Create Event</button>
        </form>
        {error   && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Event created!</p>}
      </div>
    </div>
  );
};

export default CreateEvent;
