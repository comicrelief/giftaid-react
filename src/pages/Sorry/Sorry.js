import React from 'react';

// import components
import UpdateMessage from './UpdateMessage';
import SubmitMessage from './SubmitMessage';

const Sorry = () => (
  <div className="container">

    <div className="container--inner">

      <h1>Sorry!</h1>
      { window.location.pathname === '/sorry'
        ? <SubmitMessage />
        : <UpdateMessage />
        }

      <p className="message-support-title">
        Thanks for your support.
      </p>

    </div>

  </div>
);

export default Sorry;
