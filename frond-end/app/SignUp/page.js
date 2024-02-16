'use client';

import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import {GoogleProvider } from '../firebase/config'
import '../globals.css';
import game1 from '../../images/game1.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [password, setPassword] = useState('');
   
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = () => {
      router.push('/SignIn'); 
  };

    const handleSignUp = async () => {
      try {
          // Password validation
          setTimeout(()=>{ router.push('/');},1500)
         

          const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
          if (!passwordRegex.test(password)) {
              alert("Password must contain at least one capital letter, one number, and one symbol (!@#$%^&*)");
              return;
          }
  
          // Create user with email and password
          const res = await createUserWithEmailAndPassword(email, password);
          console.log('User creation response:', res);
  
          if (!res || !res.user) {
              alert("User creation failed. Please try again.");
              return;
          }
  
          // Make API call to register the user
          const registerResponse = await axios.post('http://localhost:4000/users/register', {
              firstName,
              lastName,
              email,
              birth,
              password
          });
          router.push('/');

          console.log('Registration API response:', registerResponse);
  
          // Store the user's email in session storage
          sessionStorage.setItem('userEmail', email);
  
          setEmail('');
          setPassword('');
          setBirth('');
          setFirst('');
          setLast('');
          router.push('/');
          alert("Sign up successful");
      } catch (e) {
          console.error(e);
          alert("Sign up failed. Please try again.");
      }
  };
  
  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithGoogle(GoogleProvider);
      console.log({ res });
      sessionStorage.setItem('user', true);
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 background-blur">
            <h1>Your Logo</h1>
            <hr />
            <div className="signup-container">
                <h1 className="text-white text-2xl mb-5">CREATE   ACCOUNT </h1>
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
                <img className='ll'  onClick={handleGoogleSignUp} src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png" alt="" />
                <h4>or</h4>
                <button
                    onClick={handleSignIn}
                    className="signup-btn"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUp;
