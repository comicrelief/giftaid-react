import React from 'react';

import Logo from './Logo';
import SiteService from '../../service/Site.service';

const Header = () => {
  const {
    logo, alt, home_url, title_postfix
  } = new SiteService().config;
  const title = title_postfix.substring(2).trim();
  return (
    <header className="header" role="banner">
      <div className="header__inner-wrapper">
        <div id="block-branding" className="block block-branding">
          <Logo
            href={home_url}
            className={
              !home_url.includes('sportrelief') ? 'site-logo' : 'sr-logo'
            }
            title={title}
            rel="home noopener noreferrer"
            logo={logo}
            alt={alt}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
