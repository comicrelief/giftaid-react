import React from 'react';

import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';

const JustInTimeComponent = (props) => {

  const submitMessage = () => {
    return (
      <div>
        <p>
          <strong>
            Name, phone number and address:
            {' '}
          </strong>
          we need these details to process a Gift Aid claim on your donation.
        </p>
      </div>
    );
  };

  const updateMessage = () => {
    return (
      <div>
        <p>
          <strong>Name, email and address: </strong>
          we need this information to identify your donation
          and update the gift aid status on your donation.
        </p>
        <p>We will only use your phone number to match your SMS donations to your gift aid status.
        </p>
      </div>
    );
  };

  return (
    <JustInTime linkText={props.text}>
      { props.submit || props.submit !== undefined ? submitMessage() : updateMessage() }
    </JustInTime>
  );
};

export default JustInTimeComponent;
