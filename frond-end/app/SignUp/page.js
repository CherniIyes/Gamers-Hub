// SignUp.js
'use client';

import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import '../globals.css'
import game1 from '../../images/game1.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('')
  const [password, setPassword] = useState('');
  
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      // Password validation
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!passwordRegex.test(password)) {
        alert("Password must contain at least one capital letter, one number, and one symbol (!@#$%^&*)");
        return;
      }
  
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
  
      // Store the user's email in session storage
      sessionStorage.setItem('userEmail', email);
  
      setEmail('');
      setPassword('');
      setBirth('');
      setFirst('');
      setLast('');
      router.push('/SignIn');
      alert("Sign up successful");
    } catch (e) {
      console.error(e);
      alert("Sign up failed. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900"  >
  <img src={game1} alt="Game 1" width={400} height={300} />
      <div className="signup-container">
        
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirst(e.target.value)}
          className="input-field"
        />
         <input
          type="LastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLast(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="Birth"
          placeholder="Birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button
          onClick={handleSignUp}
          className="signup-btn"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;

