import React from 'react';

/*
* Sorry Page Message
*
*/
const Message = (props) => {

  if (window.location.pathname === '/sorry') {
    return (
      <div>
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
          <a href="https://giftaid.comicrelief.com/" className="link link--black">giftaid.comicrelief.com</a>
          {' '} and please try again in a few hours.
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        We aren’t able to process your Gift Aid update request at the moment.
      </p>
      <h2>Please try again in 5</h2>

      <p>
        If you are still experiencing issues, please contact&nbsp;
        <a href="mailto:donations@comicrelief.com" className="link link--black">
          donations@comicrelief.com
        </a>
        &nbsp;and a member of our support team can assist you with your update.
      </p>
    </div>
  );
};

export default Message;
