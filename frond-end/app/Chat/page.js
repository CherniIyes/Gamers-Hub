// pages/chatroom.js
"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      socket.emit('message', inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((data, index) => (
          <div key={index}>
            <span>{data.username}: </span>
            <span>{data.message}</span>
          </div>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;
