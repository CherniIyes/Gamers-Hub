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
import Footer from '../Footer/Footer'



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
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 background-blur container">
       <div>
    
        <hr></hr>
        </div>
      <div className="signup-container">
       
        <h1 className="text-white text-2xl mb-5">CREATE ACCOUNT </h1>
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
        <button onClick={handleSignUp} className="signup-btn">
          Sign Up
        </button>
        <img
          className="ll"
          onClick={handleGoogleSignUp}
          src="https://cdn-icons-png.flaticon.com/512/270/270014.png"
          alt=""
        />
        <h4>or</h4>
        <button onClick={handleSignIn} className="signup-btn">
          Sign In
        </button>
      </div>
      <img
        className="img"
        src="https://assets-global.website-files.com/646557ee455c3e16e4a9bcb3/64ed5632e0c52c100c16f293_bg-gamers.webp"
      />
    <div className='about'>
<h1>Discover Our Space :</h1>
<div className='game'>
  <img src ="https://nftplazas.com/wp-content/uploads/2023/02/ImmutableX-Sets-Up-All-Access-Immutable-Gaming-Passport.png"/>
<p>Welcome to GameHub, the pulsating heart of the gaming community. At GameHub, we're not just a website; we're a vibrant haven where gamers from all walks of life converge, connect, and forge lasting friendships. Engage in lively discussions, share your gaming achievements, and immerse yourself in a world where camaraderie knows no bounds. Every click, every post, and every shared moment adds to the tapestry of our thriving gaming universe.</p>
</div>
<div className='assecoire'>
  <p>But GameHub is more than just a gathering place. We are also your one-stop destination for all things gaming. Dive into our meticulously curated selection of top-notch games and cutting-edge accessories. From the latest releases to must-have gear, GameHub ensures that every gamer's needs are not only met but exceeded. Join us on this extraordinary journey where the gaming community meets a marketplace designed with you in mind. GameHub – where connections are made, victories are celebrated, and the gaming future is now. Welcome to the epicenter of gaming; welcome to GameHub.</p>
<img src="https://i.etsystatic.com/23665971/r/il/427b8e/3445692672/il_fullxfull.3445692672_agd6.jpg"/>
</div>
    </div>
    <Footer/>
    </div>
  );
};

export default SignUp;
