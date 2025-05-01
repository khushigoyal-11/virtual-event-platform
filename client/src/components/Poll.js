import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Poll = ({ eventID }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollActive, setPollActive] = useState(false);
  const [results, setResults] = useState([]);

  const createPoll = () => {
    const pollData = {
      eventID,
      question,
      options: options.map(o => ({ option: o, votes: 0 }))
    };
    socket.emit('pollUpdate', pollData);
    setPollActive(true);
  };

  socket.on('pollUpdate', (data) => {
    setResults(data.options);
  });

  return (
    <div>
      <h3>Live Poll</h3>
      {!pollActive ? (
        <div>
          <input
            type="text"
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                setOptions(newOptions);
              }}
            />
          ))}
          <button onClick={createPoll}>Create Poll</button>
        </div>
      ) : (
        <div>
          <h4>Results:</h4>
          <ul>
            {results.map((res, idx) => (
              <li key={idx}>
                {res.option}: {res.votes}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Poll;
