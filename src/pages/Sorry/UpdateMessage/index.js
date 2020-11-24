import React from 'react';

/*
* Update Sorry Page Message
*
*/
const UpdateMessage = props => (
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

export default UpdateMessage;
