import React from 'react';

const GiftAidConfirmMessage = (props) => {

  return (
    <div>
      <h1>Thank you, <br /> {props.firstname}!</h1>
      <p>
        We’ve registered your Gift Aid declaration,
        we’ll use it to pay for our operational costs.
      </p>
    </div>
  );

};

export default GiftAidConfirmMessage;
