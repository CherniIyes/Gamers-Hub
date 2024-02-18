'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      router.push('/signin');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 background-blur container">
      <div>
        <h2>Your Logo</h2>
        <hr />
      </div>
      <div className="profile-container">
        {userData ? (
          <>
            <img
              src={userData.profilePicture || '/default-profile-picture.jpg'}
              alt="Profile"
              className="profile-picture"
            />
            <h1 className="text-white text-2xl mb-2">{userData.username}</h1>
            <p className="text-white mb-4">{userData.email}</p>
          </>
        ) : (
          <p className="text-white">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;