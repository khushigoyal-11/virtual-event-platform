// client/src/pages/EventDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Chat from "../components/Chat";
import Poll from "../components/Poll";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await API.get("/events");
      const foundEvent = res.data.find((e) => e._id === id);
      setEvent(foundEvent);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        {new Date(event.date).toLocaleDateString()} at {event.time}
      </p>
      {/* Include Chat and Poll components if needed */}
      <Chat eventID={id} />
      <Poll eventID={id} />
    </div>
  );
};

export default EventDetails;
