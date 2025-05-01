import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Event Platform</h1>
      <button
        className="btn"
        onClick={() => nav('/attendee/dashboard')}
      >
        Explore Events
      </button>
    </div>
  );
}
