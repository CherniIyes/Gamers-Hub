'use client';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  
  const router = useRouter();

  const handleSignIn = async () => {
    try {
        // Validate email and password
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const loginResponse = await axios.post('http://localhost:4000/users/login', {
            email,
            password,
        });

        console.log('Login API response:', loginResponse);

        if (!loginResponse || !loginResponse.data || loginResponse.data.error) {
            alert("Invalid email or password. Please try again.");
            return;
        }

        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/');
        alert("Sign in successful");
    } catch (e) {
        console.error(e);
        alert("Sign in failed. Please try again.");
    }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 background-blur container">
    <div>
     <h2>your logo</h2>
     <hr></hr>
     </div>
   <div className="signup-container1">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
      </div>
      <img
        className="img"
        src="https://assets-global.website-files.com/646557ee455c3e16e4a9bcb3/64ed5632e0c52c100c16f293_bg-gamers.webp"
      />
    </div>
  );
};

export default SignIn;

