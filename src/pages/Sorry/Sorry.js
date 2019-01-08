import React from 'react';

const Sorry = () => (
  <div className="container">
    <div className="container--inner">
      <h1>Sorry!</h1>
      <p>
        We’re really sorry, but with people across the UK rushing to Gift Aid
        their text donation, our site is a bit overwhelmed and has had to have a lie down.
      </p>
      <h2>Please try again in 5</h2>
      <p>
        Gift Aid costs you nothing, and we use it to pay for our operational costs.
      </p>
      <p>
        If it’s been longer than 15 minutes please make a note of the website
        address:
        {' '}
        <a href="http://giftaid.rednoseday.com" className="link link--black">giftaid.rednoseday.com</a>
        {' '} and please try again in a few hours.
      </p>
      <p className="message-support-title">
        Thanks for your support.
      </p>
    </div>
  </div>
);
export default Sorry;
