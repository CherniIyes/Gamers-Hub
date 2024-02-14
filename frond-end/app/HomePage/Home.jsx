
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to GamersHub</h1>
        <nav>
          <ul>
            <li><Link href="/games"><a>Games</a></Link></li>
            <li><Link href="/community"><a>Community</a></Link></li>
            <li><Link href="/about"><a>About Us</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
            <li><Link href="/signup"><a>Sign Up</a></Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Discover Your Next Adventure</h2>
            <p>Explore a vast collection of games, connect with other gamers, and stay up-to-date with the latest gaming news.</p>
            <Link href="/games"><a className="btn">Explore Games</a></Link>
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
      <footer>
        <p>&copy; {new Date().getFullYear()} GamersHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
