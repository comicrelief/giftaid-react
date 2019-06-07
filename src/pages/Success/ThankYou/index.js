import React, {useContext} from 'react';

// import context
import AppContext from '../../../context/AppContext';

const ThankYou = (props) => {

  // get context
  const { successState: state } = useContext(AppContext);
  // const state = app.successState;

  if (state !== undefined && state.firstname !== undefined && state.giftAidChoice !== '0') {
    return (
      <div>
        <h1>Thank you, <br /> {state.firstname}!</h1>
        <p>
          We’ve registered your Gift Aid declaration,
          we’ll use it to pay for our operational costs.
        </p>
      </div>
    );
  }
  if (state !== undefined && state.giftAidChoice === '0') {
    return (
      <div>
        <h1>Thanks for letting us know</h1>
        <p>
          We won’t claim Gift Aid for your donation
        </p>
      </div>
    );
  }
  return null;
};

export default ThankYou;
