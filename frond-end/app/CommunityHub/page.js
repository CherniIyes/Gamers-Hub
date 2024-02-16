'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import './CommunityHub.css';
import Link from 'next/link';

const Community = () => {
      const [postes, setPostes] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedPost, setSelectedPost] = useState(null)
      const [scrolled, setScrolled] = useState(false);
      const [showCreateHubPopup, setShowCreateHubPopup] = useState(false);
      const [newHubData, setNewHubData] = useState({
            title: '',
            description: '',
            bigdescription: '',
            user: '',
      });

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
                  if (Array.isArray(response.data)) {
                        setPostes(response.data);
                  }
            } catch (error) {
                  console.error('Error fetching il jaw:', error);
            }
      };

      const handleCardClick = (post) => {
            // Set the selected post when a community-card is clicked
            setSelectedPost(post);
      };

      const handleClosePopup = () => {
            // Clear the selected post when closing the popup
            setSelectedPost(null);
      };


      const handleCreateHubClick = () => {
            // Show the Create Hub popup
            setShowCreateHubPopup(true);
      };

      const handleCloseCreateHubPopup = () => {
            // Hide the Create Hub popup and reset form data
            setShowCreateHubPopup(false);
            setNewHubData({
                  title: '',
                  description: '',
                  bigdescription: '',
                  user: '', // Reset other fields if needed
            });
      };

      const handleCreateHubSubmit = async () => {
            try {
                  // Send a request to create a new hub with newHubData
                  await axios.post('http://localhost:4000/postes/add', newHubData);
                  // Refresh the list of hubs
                  getAllPostes();
                  // Close the Create Hub popup
                  handleCloseCreateHubPopup();
            } catch (error) {
                  console.error('Error creating hub:', error);
            }
      };

      return (
            <div className='all'>

                  <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                        <h1>Welcome to GamersHub</h1>
                        <nav>
                              <ul>
                                    <li><Link href="/games">Games</Link></li>
                                    <li><Link href="/community">Community</Link></li>
                                    <li><Link href="/about">About Us</Link></li>
                              </ul>
                        </nav>
                  </header>

                  {/* <div className="nav">
                        <span className="items" >
                              🛒
                        </span>
                        <span className="items">
                              🔻
                        </span>
                  </div> */}
                  <div className='top-shelf'>
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

                        <div className='next'>
                              <div className='some'>cant find it ? be the first to add it</div>
                              <button onClick={handleCreateHubClick}>Create A Hub</button>
                        </div>

                  </div>

                  <div className="community-container">
                        {postes.map((post) => (
                              <div key={post.id} className="community-card" onClick={() => handleCardClick(post)}>
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
                  {selectedPost && (
                        <div className="popup-container">
                              <div className="popup">
                                    <div className="popup-header">
                                          <span onClick={handleClosePopup}>&times;</span>
                                    </div>
                                    <div className="popup-content">
                                          <h3>{selectedPost.title}</h3>
                                          <p>{selectedPost.description}</p>
                                          <p>{selectedPost.bigdescription}</p>
                                    </div>
                              </div>
                        </div>
                  )}

                  {showCreateHubPopup && (
                        <>
                              {/* Overlay to prevent interactions outside the popup */}
                              <div className="overlay" onClick={handleCloseCreateHubPopup}></div>

                              <div className="create-hub-popup">
                                    <div className="popupp">
                                          <div className="popup-headerp">
                                                <span onClick={handleCloseCreateHubPopup}>&times;</span>
                                          </div>
                                          <div className="popup-contentp">
                                                <h3>Create a New Hub</h3>
                                                <input
                                                      type="text"
                                                      placeholder="Title"
                                                      value={newHubData.title}
                                                      onChange={(e) => setNewHubData({ ...newHubData, title: e.target.value })}
                                                />
                                                {/* Add other input fields for description, bigdescription, user, etc. */}
                                                <button onClick={handleCreateHubSubmit}>Create Hub</button>
                                          </div>
                                    </div>
                              </div>
                        </>
                  )}
            </div>
      );
};

export default Community;