import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Home.css'; // Adjust the import to match the file name
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';



const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [trendingDiscussions, setTrendingDiscussions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchFeaturedGames = async () => {
      // Simulated data for featured games
      const data = [
        { id: 2, title: 'Albion', description: 'Albion is a role-playing video game and features a number of gameplay elements typical of that genre. The player controls a party of up to six characters,', imageUrl: 'https://www.stillfront.com/en/wp-content/uploads/sites/2/2018/10/alb-online.jpg' },
        { id: 2, title: 'Conflict Nation', description: 'Conflict of Nations World War 3 is a military grand strategy game set in the late 20th and early 21st century', imageUrl: 'https://www.stillfront.com/en/wp-content/uploads/sites/2/2019/05/stillfrotn-conflict-of-nations-featured-image.jpg' },
        { id: 3, title: 'The Horus Heresy: Legions', description: 'Horus Heresy is a board game that pits two players against each other to recreate the most famous battle of Warhammer 40,000s rich history', imageUrl: 'https://www.stillfront.com/en/wp-content/uploads/sites/2/2019/05/stillfront-featured-games-horus-heresy-legions-featured-image.jpg' }
      ];
      setFeaturedGames(data);
    }

    const fetchLatestNews = async () => {
      // Simulated data for latest news
      const data = [
        { id: 1, title: 'Genshin Impact Chart Shows Xianyun and Nahida First-week Banner Revenue', content: 'A Genshin Impact chart shows the first-week sales of the ongoing banner that features the new Anemo user Xianyun and the Dendro Archon Nahida.', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/genshin-impact-xianyun-demo.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
        { id: 2, title: 'Genshin Impact Leak Gives Info About Chioris Appearance on Standard Banner', content: 'A new Genshin Impact leak reveals more details about the five-star Geo user Chiori and her potential appearance on the Standard Character Banner.', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/genshin-impact-chiori.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
        { id: 3, title: 'Xbox Game Pass Adds Two Games with ‘Very Positive’ Reviews', content: 'Two more titles are added to the diverse catalog of games available on Microsoft’s Xbox Game Pass subscription service for Xbox One and Series X/S.', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/xbox-game-pass-on-logo.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
        { id: 4, title: 'Xbox Game Pass Is Losing 2 Games Today', content: 'February 15 is the last day to play two Xbox Game Pass titles that boast Mostly and Overwhelmingly Positive reviews from Steam users', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/white-xbox-game-pass-logo-with-light-green-gray-outer-glow-on-blurred-opus-echo-of-starsong-steam-promo-screenshot-1.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
        { id: 5, title: 'Suicide Squad Game Update Nerfs XP Exploit and More', content: 'Rocksteady rolls out a major Suicide Squad patch addressing pressing gameplay exploits that had threatened progression balance.', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/suicide-squad-kill-the-justice-league-lineup-with-logo.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
        { id: 6, title: 'Fortnite Players Are Frustrated With the Game’s Bots', content: 'Fortnite fans express their disappointment towards the use of AI bots and the games inefficient matchmaking system.', imageUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/fortnite-rarest-skins.jpg?q=50&fit=crop&w=400&h=220&dpr=1.5' },
      ];
      setLatestNews(data);
    };

    const fetchTrendingDiscussions = async () => {
      // Simulated data for trending discussions
      const data = [
        { id: 1, title: 'Generative AI in Gaming', description: 'In 2024, the gaming space will start seeing the impacts of Generative AI. Generative AI s ability to transform players experience, creating believable characters who can interact with players without reading from scripts or creating whole new content depending on the players behavior merely by employing real-time generative AI during gameplay.' },
        { id: 2, title: 'Competitive Multiplayer Mobile Gaming', description: 'The previous year has witnessed the transformation of competitive multiplayer mobile games into a rage. With eSports turning into a global phenomenon and the rapid popularity of games like PUBG Mobile, Multiplayer mobile games have proved themselves a prominent gaming trend of 2023 and will continue to dominate lion’s share in 2024 and ahead.' },
        { id: 3, title: 'Fitness Gaming', description: 'The effectiveness of fitness gaming is far-reaching, and day by day, people are leaning forward more toward fitness gaming. Fitness gaming or Active Video Games (AVG) have been around for quite some time. But, it is undergoing a recent surge in popularity and growth.'},
        { id: 4, title: 'Blockchain-Based Gaming Trends 2024', description: 'Blockchain-enabled video games have changed the rules by transforming gaming into a sector with many exploration opportunities. Blockchains use powerful data encryption technologies to prevent hackers from modifying or destroying an online transaction.' },
        { id: 5, title: 'Esports', description: 'A person can earn from playing video games. It was a matter of laughingstock or scorn during the 90s. And now, the world is witnessing NFT video games and Esports, aiding individual gamers and enterprises to earn and grow revenue. Esports is growing into a booming global industry where skilled video gamers play competitively.' },
        { id: 6, title: 'Metaverse Gaming Trends', description: 'The debut of video games in the metaverse is already hype. Many game studios have already initiated carving out their first and best shot in metaverse gaming. The implementation of metaverse game development in various sectors is growing day by day.' },
        { id: 7, title: 'AR and VR in Gaming', description: 'In terms of offering an immersive first-person video game playing experience, Augmented and Virtual Reality gaming have barely any alternative. The advent of Pokemon Go gave rise to AR gamings overnight popularity.' },
        { id: 8, title: 'Cloud and Streaming Video Games', description: 'Gaming as a Service (Gaas) or cloud gaming is a revolution in the making that could redefine the entertainment and gaming industry. Completely eliminating the need for high-end and expensive hardware, cloud gaming will enable remote access to gaming content.' }
      ];
      setTrendingDiscussions(data);
    };

    // Fetch data
    fetchFeaturedGames();
    fetchLatestNews();
    fetchTrendingDiscussions();

    // Scroll event listener
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % latestNews.length);
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + latestNews.length) % latestNews.length);
  };

  return (
    <div className='mainne'>
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
      <main>
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
      </main>
      <footer className={`footer ${scrolled ? 'scrolled' : ''}`}>
        <p>&copy; {new Date().getFullYear()} GamersHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
