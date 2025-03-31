import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import API from '../services/api';

const socket = io('http://localhost:5000');

const Chat = ({ eventID }) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch previous chat messages
    const fetchChats = async () => {
      const res = await API.get(`/chat/${eventID}`);
      setChats(res.data);
    };
    fetchChats();

    // Listen for real-time messages
    socket.on('chatMessage', (data) => {
      setChats(prev => [...prev, data]);
    });

    return () => socket.off('chatMessage');
  }, [eventID]);

  const sendMessage = () => {
    const data = { eventID, message, senderID: "self" };
    socket.emit('chatMessage', data);
    setMessage('');
  };

  return (
    <div>
      <h3>Live Chat</h3>
      <div style={{ border: '1px solid #ccc', padding: '5px', height: '200px', overflowY: 'scroll' }}>
        {chats.map((chat, idx) => <div key={idx}>{chat.message}</div>)}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
