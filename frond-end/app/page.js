'use client'

import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase-related import commented out
// import { auth } from './firebase/config.js'; // Import Firebase auth configuration - commented out
// import { useRouter } from 'next/router'; // Import the correct module - commented out
// import { signOut } from 'firebase/auth'; // Firebase-related import commented out
import Home from './HomePage/page'

export default function Page() {
  // const [user] = useAuthState(auth); // Firebase-related code commented out
  // const router = useRouter(); // Firebase-related code commented out

  // if (typeof window !== 'undefined') {
  //   const userSession = sessionStorage.getItem('user'); // Firebase-related code commented out

  // console.log({ user }); // Firebase-related code commented out

  //   if (!user && !userSession) {
  //     router.push('/SignUp'); // Firebase-related code commented out
  //   }
  // }

  // const handleLogout = async () => { // Firebase-related code commented out
  //   try {
  //     await signOut(auth); // Firebase-related code commented out
  //     sessionStorage.removeItem('user'); // Firebase-related code commented out
  //     router.push('/SignUp'); // Firebase-related code commented out
  //   } catch (error) {
  //     console.error('Logout failed:', error); // Firebase-related code commented out
  //   }
  // };

  return (
    <div>
      {/* <div>page</div>
      <h1>product</h1> */}
      <Home />
      {/* Render the Product component */}
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> // Firebase-related code commented out
        <button onClick={handleLogout}>Log out</button> // Firebase-related code commented out
      </main> */}
    </div>
  );
}
