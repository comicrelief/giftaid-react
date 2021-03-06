import React from 'react';

/*
* Submit Sorry Page Message
*
*/
const SubmitMessage = (props) => {

  return (
    <div>
      <p>
        We’re really sorry, but with people across the UK rushing to Gift Aid
        their text donation, our site is a bit overwhelmed and has had to have a lie down.
      </p>
      <h2>Please try again in 5</h2>
      <p>
        If it’s been longer than 15 minutes please make a note of the website
        address:
        {' '}
        <a href="https://giftaid.comicrelief.com/" className="link link--black">giftaid.comicrelief.com</a>
        {' '} and please try again in a few hours.
      </p>
    </div>
  );
};

export default SubmitMessage;
