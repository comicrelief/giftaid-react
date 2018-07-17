import React from 'react';
import logo from './images/CR18-logo.svg';

const Header = () => (
  <div>
    <header role="banner">
      <div className="header__inner-wrapper">
        <a href="https://www.comicrelief.com" className="logo cr-logo" title="Comic Relief">
          <img src={logo} alt="Go to Comic Relief" />
        </a>
      </div>
    </header>
  </div>
);

export default Header;
