// client/src/pages/AnalyticsDashboard.js
import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await API.get('/analytics/events');
      setAnalytics(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>
      <p>Total Events: {analytics.totalEvents}</p>
      <p>Total Chat Messages: {analytics.totalChats}</p>
      {/* Add more metrics as needed */}
    </div>
  );
};

export default AnalyticsDashboard;
