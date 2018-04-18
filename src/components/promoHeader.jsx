/* eslint-env browser */
import React, { Component } from 'react';


class PromoHeader extends Component {
  render() {
    return (
      <header className="promo-header promo-header--small bg--dark-purple">
        <div className="promo-header__content">
          <div className="promo-header__content-inner promo-header__content-inner--center">
            <h1>
              <span className="visually-hidden">Giftaid it</span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

export default PromoHeader;
