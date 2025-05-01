import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      padding: '1rem',
      background: '#222',
      display: 'flex',
      gap: '1rem'
    }}>
      <NavLink to="/"          style={{ color: '#eee' }}>Home</NavLink>
      <NavLink to="/login"     style={{ color: '#eee' }}>Login</NavLink>
      <NavLink to="/register"  style={{ color: '#eee' }}>Register</NavLink>
    </nav>
  );
}
