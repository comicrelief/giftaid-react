/* eslint-env browser */

import React, { Component } from 'react';
import propTypes from 'prop-types';


class PromoHeader extends Component {
  render() {
    return (
      <header className="promo-header bg--dark-purple">
        <div className="promo-header__content">
          <div className="promo-header__content-inner promo-header__content-inner--centre">
            <h1>
              <span className="visually-hidden">Giftaid it</span>
            </h1>
            <h2>
              <span id="giftaid-form" className="bold">Fill in the short form </span>
              <a
                aria-labelledby="giftaid-form"
                className="link link--light-grey inline"
                onClick={this.props.scrollToForm}
                href="#form"
              >
                below
              </a>
              <br />to Gift aid your donation and
              <br className="mobile-line-break" />
              <span className="font--red">
                &nbsp;the Government will give us 25% on top of your donation.
              </span>
            </h2>
            <p>It doesn’t cost you a penny, and helps to keep us going.</p>
            <p className="font--xsmall font--grey">
              If you’re making a personal donation please give your full
              name and home address and tick the box or we can’t claim Gift Aid.
              You must be a UK taxpayer and understand that if you pay less
              Income Tax and /or Capital Gains Tax in the current tax year than
              the amount of Gift Aid claimed on all your donations it is your
              responsibility to pay any difference.<br />
              <a
                className="link link--grey inline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.comicrelief.com/frequently-asked-questions#gift-aid"
              >
                Find out more about Gift Aid.
              </a>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

PromoHeader.propTypes = {
  scrollToForm: propTypes.func.isRequired,
};

export default PromoHeader;
