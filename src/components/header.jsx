/* eslint-env browser */
import React, { Component } from 'react';
// import propTypes from 'prop-types';


class Header extends Component {
  render() {
    return (
      <div>
        <a href="https://www.comicrelief.com"><img src="images/CR_logo.jpg" alt="Go to Comic Relief" /></a>
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
