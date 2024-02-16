// pages/chatroom.js
"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
// import styles from '../styles/ChatRoom.module.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [audioStream, setAudioStream] = useState(null);
  const socket = io(); // Socket connection defaults to the current domain

  useEffect(() => {
    // Fetch initial chat history from the server
    fetchChatHistory();

    // Subscribe to new chat messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/api/chatroom'); // API routes are server-side endpoints in Next.js
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch chat history:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/chatroom', { // API routes are server-side endpoints in Next.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      if (response.ok) {
        setNewMessage('');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
    } catch (error) {
      console.error('Error starting voice chat:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Chatroom</title>
      </Head>
      <h1>Chatroom</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <button onClick={startVoiceChat}>Start Voice Chat</button>
      </div>
      {audioStream && (
        <audio src={URL.createObjectURL(audioStream)} controls autoPlay />
      )}
    </div>
  );
};

export default ChatRoom;
