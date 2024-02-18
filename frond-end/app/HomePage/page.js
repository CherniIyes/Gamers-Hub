// HomePage.js
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Home.css'; // Adjust the import to match the file name
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Chat from '../chatt/page'


// import Navbar from '../Navbar/Page'; // Import the Navbar component
const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [trendingDiscussions, setTrendingDiscussions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatVisible, setIsChatVisible] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredGamesResponse = await fetch('http://localhost:4000/games/getAll');
        const latestNewsResponse = await fetch('http://localhost:4000/new/getAll');
        const trendingDiscussionsResponse = await fetch('http://localhost:4000/trending/getAll');

        const featuredGamesData = await featuredGamesResponse.json();
        const latestNewsData = await latestNewsResponse.json();
        const trendingDiscussionsData = await trendingDiscussionsResponse.json();

        setFeaturedGames(featuredGamesData);
        setLatestNews(latestNewsData);
        setTrendingDiscussions(trendingDiscussionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % latestNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + latestNews.length) % latestNews.length);
  };

  return (
    
    <div className='mainne'>
        <nav className="navbar">
          <div className="logo">Your Logo</div>
          <div className="nav-links">
            <Link href="/HomePage">
              <p className="home-link">Home</p>
            </Link>
            <Link href="/CommunityHub">
              <p>CommunityHub</p>
            </Link>
            <Link href="Products">
              <p>Games</p>
            </Link>
            <Link href="#">
          <p onClick={() => setIsChatVisible(true)}>Chat</p>
        </Link>

          </div>
        </nav>
        <main>
       {/* Conditionally render the Chat component */}
       {isChatVisible && <Chat />}

{/* Render the content of the HomePage */}
{!isChatVisible && (
  <>
          <section className={`hero ${scrolled ? 'scrolled' : ''}`}>
            <div className="hero-content">
              <h2>Discover Your Next Adventure</h2>
              <p>Explore a vast collection of games, connect with other gamers, and stay up-to-date with the latest gaming news.</p>
              <Link href="/games" className="btn">Explore Games</Link>
            </div>
          </section>
          <section className={`featured-games section ${scrolled ? 'scrolled' : ''}`}>
            <h2>Featured Games</h2>
            <div className="game-grid">
              {featuredGames.map(game => (
                <div key={game.id} className="game-card">
                  <img src={game.imageUrl} alt={game.title} />
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section className={`latest-news section ${scrolled ? 'scrolled' : ''}`}>
            <h2>Latest News</h2>
            <Splide options={{ type: 'loop', perPage: 3, focus: 'center' }}>
              {latestNews.map(news => (
                <SplideSlide key={news.id}>
                  <div className="news-card">
                    <img src={news.imageUrl} alt={news.title} />
                    <h3>{news.title}</h3>
                    <p>{news.content}</p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </section>
          <section className={`trending-discussions section ${scrolled ? 'scrolled' : ''}`}>
            <h2>Trending Discussions</h2>
            <Splide options={{ type: 'loop', perPage: 3, focus: 'center' }}>
              {trendingDiscussions.map(discussion => (
                <SplideSlide key={discussion.id}>
                  <div className="discussion-card">
                    <h3>{discussion.title}</h3>
                    <p>{discussion.description}</p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </section>

          </>
      )}
    </main>
          
        <footer className={`footer ${scrolled ? 'scrolled' : ''}`}>
          <p>&copy; {new Date().getFullYear()} GamersHub. All rights reserved.</p>
        </footer>
      </div>
      );
}

      export default HomePage;
