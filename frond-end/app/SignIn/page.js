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

        // Make API call to authenticate the user
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
       <div className="min-h-screen flex items-center justify-center bg-gray-900 background-blur">

<div className="signup-container">
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
    </div>
  );
};

export default SignIn;

