'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
                  } else {
                        setError('Unexpected response structure');
                  }
            } catch (error) {
                  console.error('Error fetching il jaw:', error);
                  setError('Error fetching il jaw');
            }
      };

      return (
            <div>
                  <div className="news-cards-container">
                        {postes.map((post) => (
                              <div>
                                    <p className="news-title">{post.title}</p>
                                    <p className="news-title">{post.description}</p>
                              </div>
                        ))}
                  </div>
            </div>
      );
}

export default Community;