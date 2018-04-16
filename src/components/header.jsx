/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';


class Header extends Component {
  renderHeaderCopy() {
    return (
      <div><h1>GiftAid</h1>  <p>yada yada</p></div>
    );
  }

  render() {
    return (
      <div>
        <p>{ this.renderHeaderCopy() } </p>
        <p>{ this.props.campaign } </p>
      </div>

    );
  }
}

Header.propTypes = {
  campaign: propTypes.string,
};

Header.defaultProps = {
  campaign: 'RedNoseDay',
};

export default Header;
