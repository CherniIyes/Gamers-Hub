'use client'
import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from '../ChatFeed/ChatFeed';
import '../ChatFeed/chat.css'
import Link from 'next/link';
import "./chat.css"
import Footer from '../Footer/Footer'

const ChatPage = () => {
  return (
    <div>
      <nav className="navbar">
      <div className='logo'>
          <h1>GamersHub</h1>

        </div>
        <div className="nav-links">
          <Link href="/HomePage">
            <p className="home-link">Home</p>
          </Link>
          <Link href="/CommunityHub">
            <p>CommunityHub</p>
          </Link>
          <Link href="/Products">
            <p>Games</p>
          </Link>
          <Link href="/chatt">
            <p>Chat</p>
          </Link>
        </div>
      </nav>


      <div className='chat'>

        <ChatEngine
          height="100vh"
          projectID="6f31f42b-d6a7-47c9-b45a-403fd5f33259"
          userName="ameni"
          userSecret="123123"
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />

      </div>
  
    </div>
  );
};

export default ChatPage;
