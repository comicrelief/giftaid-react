/* eslint-env browser */
import React, { Component } from 'react';
import logo from '../images/CR_logo.jpg';
import campaignLogos from '../images/campaign_logos.png';
// import propTypes from 'prop-types';


class Header extends Component {
  render() {
    return (
      <div>
        <a href="https://www.comicrelief.com"><img src={logo} alt="Go to Comic Relief" /></a>
        <img src={campaignLogos} alt="Red Nose Day and Sport Relief campaign logos" />
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
