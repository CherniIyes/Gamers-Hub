import React from 'react';
import './Footer.css'; // Adjust the import to match the file name

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-menu">
          <h3>MENU</h3>
          <ul>
            <li><a href="#">VIP/ADMIN/SADMIN</a></li>
            <li><a href="#">Forum Team</a></li>
            <li><a href="#">Lite Mode</a></li>
            <li><a href="#">RSS Syndication</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>CONTACT US</h3>
          <p>Email: support@cs-gamers.net</p>
          <p>Skype: CSGAMERS.TK</p>
          <p>Discord: {`{THeKILLer}`}#6590</p>
        </div>
        <div className="footer-about">
          <h3>ABOUT US</h3>
          <p>CS-Gamers Community started at the beginning of 2018 with one server, Zombie Swarm. Our main goal is to make a successful gaming community that players love. We hope you enjoy playing on our servers!</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
