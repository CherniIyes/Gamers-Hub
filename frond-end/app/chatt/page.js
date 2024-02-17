'use client'
import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from '../ChatFeed/ChatFeed';
import '../ChatFeed/chat.css'

const ChatPage = () => {
  return (
    <ChatEngine
    height="100vh"
        projectID="6f31f42b-d6a7-47c9-b45a-403fd5f33259"
        userName="ameni"
        userSecret="123123"
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default ChatPage;
