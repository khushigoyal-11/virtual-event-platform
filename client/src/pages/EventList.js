// client/src/pages/EventList.js
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await API.get("/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id} onClick={() => navigate(`/events/${event._id}`)} style={{cursor: 'pointer', marginBottom: '10px'}}>
            {event.title} - {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
