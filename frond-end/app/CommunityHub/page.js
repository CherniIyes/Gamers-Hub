'use client'

import { AiOutlineSearch } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHub.css'

const Community = () => {
      const [postes, setPostes] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      useEffect(() => {
            getAllPostes();
      }, []);
      const handleSearchTermChange = (event) => {
            setSearchTerm(event.target.value);
      };

      const handleSearchButtonClick = () => {
            fetchNewsByTitle();
      };
      const fetchNewsByTitle = async () => {
            try {
                  const response = await axios.get(`http://localhost:4000/postes/search?title=${searchTerm}`);
                  console.log('Search Response:', response.data);

                  if (Array.isArray(response.data)) {
                        setPostes(response.data);
                  }
            } catch (error) {
                  console.error('Error searching jaw:', error);
            }
      };

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
            <div>
                  <div className='search'>
                        <div className="postes">
                              <div className="FIND-HUBS">FIND HUBS</div>
                              <input
                                    className='searchh-inputt'
                                    type="text"
                                    placeholder="Search for something..."
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                              />
                              <AiOutlineSearch className="searchh-buttonn" onClick={handleSearchButtonClick} />
                        </div>
                  </div>
                  <div className="community-container">

                        {postes.map((post) => (
                              <div key={post.id} className="community-card">
                                    <div className="community-title">
                                          <hr />
                                          {post.title}
                                    </div>
                                    <div className="community-description">
                                          {post.description}
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default Community;
