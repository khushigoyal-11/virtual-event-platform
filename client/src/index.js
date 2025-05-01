import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import './styles/GlobalStyles.css'; // Import global CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
=======
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
>>>>>>> 18180a95e2555195baa11ef8c44cc51b70a075fd
