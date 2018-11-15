import React from 'react';
import logo from './images/CR18-logo.svg';

const Header = () => (
  <header className="header" role="banner">
    <div className="header__inner-wrapper">
      <div id="block-branding" className="block block-branding">
        <a href="https://www.comicrelief.com" className="site-logo" title="Comic Relief" rel="home noopener noreferrer">
          <img src={logo} alt="Go to Comic Relief" />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
