import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('attendee');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password, role });
      alert('Registered! Please log in.');
      nav('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed — please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>
      <button type="submit" className="btn">Register</button>
    </form>
  );
}
