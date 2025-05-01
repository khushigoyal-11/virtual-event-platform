// client/src/features/dashboard/attendee/JoinSession.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../../styles/GlobalStyles.css';

const JoinSession = () => {
  const { search } = useLocation();
  const sessionLink = new URLSearchParams(search).get('link');

  return (
    <div className="container">
      <div className="card" style={{ minHeight:'650px' }}>
        <h2>Live Session</h2>

        {sessionLink
          ? (
            <iframe
              src={sessionLink}
              title="Live Session"
              width="100%"
              height="600"
              style={{ border:'none', borderRadius:'8px' }}
            />
          )
          : <p style={{ color:'red' }}>No session link provided.</p>
        }

        <Link to="/attendee/dashboard">
          <button className="btn" style={{ marginTop:'1rem' }}>
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinSession;
