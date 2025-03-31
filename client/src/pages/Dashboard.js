// client/src/pages/Dashboard.js
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Dashboard</h1>
      {token ? (
        <>
          <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
          <button onClick={() => navigate("/events")}>View Events</button>
          <button onClick={() => navigate("/create-event")}>Create Event</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
