import React, {useContext} from 'react';

// import context
import AppContext from '../../../context/AppContext';

import GiftAidConfirmMessage from './GiftAidConfirmMessage';
import GiftAidCancelMessage from './GiftAidCancelMessage';


const ThankYou = (props) => {

  // get context
  const { successState: state } = useContext(AppContext);

  return (
    <React.Fragment>
      { state !== undefined && state.firstname !== undefined && state.giftAidChoice !== '0'
        ?
        <GiftAidConfirmMessage
          firstname={state.firstname}
        />
        :
        <GiftAidCancelMessage/>
      }
    </React.Fragment>

  );
};

export default ThankYou;
