import React from 'react';
import Link from 'next/link';
import './Home.css'; // Adjust the import to match the file name

const HomePage = () => {
  return (
    <div>
      <header className="header">
        <h1>Welcome to GamersHub</h1>
        <nav>
          <ul>
            <li><Link href="/games">Games</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Discover Your Next Adventure</h2>
            <p>Explore a vast collection of games, connect with other gamers, and stay up-to-date with the latest gaming news.</p>
            <Link href="/games" className="btn">Explore Games</Link>
          </div>
        </section>
        <section className="featured-games">
          <h2>Featured Games</h2>
          <div className="game-grid">
            {/* Display featured games */}
          </div>
        </section>
        <section className="latest-news">
          <h2>Latest News</h2>
          <div className="news-grid">
            {/* Display latest gaming news */}
          </div>
        </section>
        <section className="trending-discussions">
          <h2>Trending Discussions</h2>
          <div className="discussion-grid">
            {/* Display trending community discussions */}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} GamersHub. All rights reserved</p>
      </footer>
    </div>
  );
}

export default HomePage;
