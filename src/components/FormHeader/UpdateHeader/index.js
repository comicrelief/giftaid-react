import React, { useContext } from 'react';

import FormContext from "../../../context/FormContext";

const UpdateHeader = (props) => {

  const { urlTransactionId } = useContext(FormContext); // get states from context

  return (
    <React.Fragment>
      <h2 className="sub-title">
        <div>Edit your Gift Aid declaration</div>
      </h2>
      <p className="text-align-centre">
        We can claim Gift Aid from personal donations made by UK taxpayers:
        the Government gives back 25% of their value. This will be split 50/50 between Comic Relief and BBC Children in Need as per your donation.
      </p>
      {typeof urlTransactionId !== 'undefined' && urlTransactionId !== null ?
        <p className="text-align-centre transaction-id">
          Transaction ID: {urlTransactionId}
        </p>
        :
        ''
      }
    </React.Fragment>

  );
};

export default UpdateHeader;
