'use client';
'use client';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css'
import Image from 'next/image';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user, setUser] = useState(null);
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
      setUser(loginResponse.data);
      console.log('user:', loginResponse);
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
     <div className='logo'>
    <h1>GamersHub</h1>
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
        
        <p  className="p">
          Don't have an account? <a href="/SignUp" className="text-blue-500 hover:underline" style={{ color: 'white' }}>Sign Up</a>
        </p>
        
        <p className="p">
          By signing in, you agree to our <a href="/terms" className="text-blue-500 hover:underline" style={{ color: 'white' }}>Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline" style={{ color: 'white' }}>Privacy Policy</a>.
        </p>
      </div>
      <img
        className="img"
        src="/sign.png"
      />

<div className='about'>
<h5>Join Our Space :</h5>
<div className='game'>
<video className='vd'   autoPlay loop muted >
                    <source src="/vi.mp4" type="video/mp4" />
                        <track src="/vi.mp4"/>
                </video>
              
<p>Welcome to GameHub, the pulsating heart of the gaming community. At GameHub, we're not just a website; we're a vibrant haven where gamers from all walks of life converge, connect, and forge lasting friendships. Engage in lively discussions, share your gaming achievements, and immerse yourself in a world where camaraderie knows no bounds. Every click, every post, and every shared moment adds to the tapestry of our thriving gaming universe.</p>
<p>Welcome to GameHub, the pulsating heart of the gaming community. At GameHub, we're not just a website; we're a vibrant haven where gamers from all walks of life converge, connect, and forge lasting friendships. Engage in lively discussions, share your gaming achievements, and immerse yourself in a world where camaraderie knows no bounds. Every click, every post, and every shared moment adds to the tapestry of our thriving gaming universe.</p>

</div>
</div>
    </div>
  );
};

export default SignIn;
