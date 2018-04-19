/* eslint-env browser */
import React, { Component } from 'react';
import logo from '../images/CR_logo.png';
import campaignLogos from '../images/campaign_logos.png';
// import propTypes from 'prop-types';


class Header extends Component {
  render() {
    return (
      <div>
        <header role="banner">
          <div className="header__inner-wrapper">
            <a href="https://www.comicrelief.com" className="logo cr-logo" title="Comic Relief">
              <img src={logo} alt="Go to Comic Relief" />
            </a>
            <div className="logo campaign-logo" >
              <img src={campaignLogos} alt="Red Nose Day and Sport Relief campaign logos" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

// Header.propTypes = {
//   campaign: propTypes.string,
// };
//
// Header.defaultProps = {
//   campaign: 'RedNoseDay',
// };

export default Header;
