// client/src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to the Virtual Event Platform</h1>
      <p>
        This platform lets you create and join virtual events, chat live, and participate in polls.
      </p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default Home;
