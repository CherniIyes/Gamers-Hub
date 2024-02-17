'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import './CommunityHub.css';
// import Navbar from "../Navbar/Page.jsx";
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
      const [comments, setComments] = useState([]);
      const [newComment, setNewComment] = useState({
            text: '',
      });


      useEffect(() => {
            getAllPostes();
            // Fetch comments for the selected post if there is one
            if (selectedPost) {
                  handleCardClick2(selectedPost);
            }
      }, [selectedPost]);

      const handleCardClick2 = async (post) => {
            setSelectedPost(post);
            try {
                  const response = await axios.get(`http://localhost:4000/comments/getComments?postId=${post.id}`);
                  if (Array.isArray(response.data)) {
                        setComments(response.data);
                  }
            } catch (error) {
                  console.error('Error fetching comments:', error);
            }
      };

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

      const handleCommentSubmit = async (e) => {
            e.preventDefault();
            try {
                  const response = await axios.post('http://localhost:4000/comments/add', {
                        postId: selectedPost.id,
                        user: newHubData.user,
                        text: newComment.text,
                  });

                  // Assuming the response.data is an object with comment details
                  const newCommentData = response.data;

                  // Update the comments state using the setComments function
                  setComments((prevComments) => [...prevComments, newCommentData]);

                  // Reset the new comment form
                  setNewComment({ text: '' });
            } catch (error) {
                  console.error('Error adding comment:', error);
                  // Handle the error here, e.g., show a user-friendly message or log it
            }
      };


      return (
            <div className='all'>
                  <nav className="navbar">
                        <div className="logo">Your Logo</div>
                        <div className="nav-links">
                              <Link href="/HomePage">
                                    <p className="home-link">Home</p>
                              </Link>
                              <Link href="/CommunityHub">
                                    <p>CommunityHub</p>
                              </Link>
                        </div>
                  </nav>



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

                                          {/* Display comments */}
                                          <div className="comments-section">
                                                <h4>Comments</h4>
                                                {comments.map((comment) => (
                                                      <div key={comment.id} className="comment">
                                                            <strong>{comment.user}</strong>: {comment.text}
                                                      </div>
                                                ))}
                                          </div>

                                          {/* Form for users to submit new comments */}
                                          <div className="add-comment-form">
                                                <h4>Add a Comment</h4>
                                                <form onSubmit={handleCommentSubmit}>
                                                      <div className="form-group">
                                                            <label htmlFor="commentText">Comment:</label>
                                                            <textarea
                                                                  id="commentText"
                                                                  name="commentText"
                                                                  rows="4"
                                                                  cols="50"
                                                                  value={newComment.text}
                                                                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                                                                  required
                                                            ></textarea>
                                                      </div>
                                                      <button type="submit">Submit Comment</button>
                                                </form>
                                          </div>
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
}

export default Community
