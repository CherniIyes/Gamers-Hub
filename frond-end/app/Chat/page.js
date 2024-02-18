// chatroom.js
"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chatroom.css'; // Import the CSS file

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
      const messageData = {
        username: 'YourUsernameHere', // Replace 'YourUsernameHere' with the actual username
        message: inputValue
      };
      socket.emit('message', messageData);
      setInputValue('');
    }
  };

  return (
    <div className="chatroom-container">
      <div className="message-container">
        {messages.map((data, index) => (
          <div key={index} className="message">
            <span className="username">{data.username}: </span>
            <span className="content">{data.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={inputValue} onChange={handleInputChange} className="input-field" />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatroom;
