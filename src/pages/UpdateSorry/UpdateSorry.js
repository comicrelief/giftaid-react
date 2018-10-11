import React from 'react';

const UpdateSorry = () => (
  <div className="container">
    <div className="container--inner">
      <h1>Sorry!</h1>
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
      <p className="message-support-title">
        Thanks for your support.
      </p>
    </div>
  </div>
);
export default UpdateSorry;
