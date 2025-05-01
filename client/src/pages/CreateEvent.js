import React, { useState, useContext } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    agenda: ''
  });
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event created successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event', error);
      alert('Error creating event');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        /><br /><br />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        /><br /><br />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        /><br /><br />
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Agenda"
          value={formData.agenda}
          onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
        /><br /><br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
