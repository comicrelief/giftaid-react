import React, {useContext} from 'react';

// import context
import AppContext from '../../../context/AppContext';

import Yes from './Yes';
import No from './No';


const ThankYou = (props) => {

  // get context
  const { successState: state } = useContext(AppContext);

  return (
    <React.Fragment>
      { state !== undefined && state.firstname !== undefined && state.giftAidChoice !== '0'
        ?
        <Yes
          firstname={state.firstname}
        />
        :
        <No/>
      }
    </React.Fragment>

  );
};

export default ThankYou;
