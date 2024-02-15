'use client'


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHub.css'

const Community = () => {
      const [postes, setPostes] = useState([]);

      useEffect(() => {
            getAllPostes();
      }, []);

      const getAllPostes = async () => {
            try {
                  const response = await axios.get('http://localhost:4000/postes/getAll');
                  console.log('Backend Response:', response.data);

                  if (Array.isArray(response.data)) {
                        setPostes(response.data);
                  }
            } catch (error) {
                  console.error('Error fetching il jaw:', error);
            }
      };

      return (
            <div className="community-container">
                  {postes.map((post) => (
                        <div key={post.id} className="community-card">
                              <p className="community-title">{post.title}</p>
                              <p className="community-description">{post.description}</p>
                        </div>
                  ))}
            </div>
      );
};

export default Community;
