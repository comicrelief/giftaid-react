import React, { useContext } from 'react';

import FormContext from '../../../context/FormContext';
import SiteService from '../../../service/Site.service';

const UpdateHeader = props => {
  const { urlTransactionId } = useContext(FormContext); // get states from context
  const site = new SiteService();
  let claimCopy = null;
  switch (site.getSite()) {
    case 'BIGNIGHTIN':
      claimCopy = ' the Government gives back 25% of their value. This will be split 50/50 between Comic Relief and BBC Children in Need as per your donation.';
      break;
    default:
      claimCopy = ' the Government gives us back 25% of their value.';
      break;
  }

  return (
    <>
      <h2 className="sub-title">
        <div>Edit your Gift Aid declaration</div>
      </h2>
      <p className="text-align-centre">
        We can claim Gift Aid from personal donations made by UK taxpayers:
        {claimCopy}
      </p>
      {typeof urlTransactionId !== 'undefined' && urlTransactionId !== null
        ? (
          <p className="text-align-centre transaction-id">
            Transaction ID: {urlTransactionId}
          </p>
        )
        : ''
      }
    </>

  );
};

export default UpdateHeader;
