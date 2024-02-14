// 'use client';
// import React, { useState } from 'react';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase/config';
// import { useRouter } from 'next/navigation';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
//   const router = useRouter();

//   const handleSignIn = async () => {
//     try {
//       // Validate email and password
//       if (!email || !password) {
//         alert("Please enter both email and password.");
//         return;
//       }
  
//       // Sign in with email and password
//       const res = await signInWithEmailAndPassword(email, password);
//       console.log({ res });
//       sessionStorage.setItem('user', true);
//       setEmail('');
//       setPassword('');
//       router.push('/');
//       alert("Sign in successful");
//     } catch (e) {
//       console.error(e);
//       alert("Incorrect email or password. Please try again.");
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
//         <h1 className="text-white text-2xl mb-5">Sign In</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
//         />
//         <button
//           onClick={handleSignIn}
//           className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
//         >
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

