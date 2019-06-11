import React from 'react';
import logo from './images/CR18-logo.svg';

import Logo from './Logo';

const Header = (props) => {

  return (
    <header className="header" role="banner">
      <div className="header__inner-wrapper">
        <div id="block-branding" className="block block-branding">
          <Logo
            href="https://www.comicrelief.com"
            className="site-logo"
            title="Comic Relief"
            rel="home noopener noreferrer"
            logo={logo}
            alt="Go to Comic Relief"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
