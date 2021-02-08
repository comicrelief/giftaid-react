import React, { useContext } from 'react';

// import context
import AppContext from '../../../context/AppContext';

import GiftAidConfirmMessage from './GiftAidConfirmMessage';
import GiftAidCancelMessage from './GiftAidCancelMessage';

const ThankYou = () => {
  // get context
  const { successState: state } = useContext(AppContext);

  return (
    <>
      { state !== undefined && state.firstname !== undefined && state.giftAidChoice !== 0
        ? (
          <GiftAidConfirmMessage
            firstname={state.firstname}
          />
        )
        : <GiftAidCancelMessage />
      }
    </>

  );
};

export default ThankYou;
