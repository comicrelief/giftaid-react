import React, { useContext } from 'react';

import FormContext from "../../../context/FormContext";
import SiteService from '../../../service/Site.service';

const UpdateHeader = (props) => {

  const { urlTransactionId } = useContext(FormContext); // get states from context
  const site = new SiteService();
  let claimCopy = null;
  switch(site.getSite()) {
    case 'BIGNIGHTIN':
      claimCopy = `We can claim Gift Aid from personal donations made by UK taxpayers: the Government gives back 25% of their value. This will be split 50/50 between Comic Relief and BBC Children in Need as per your donation.`;
    break;
    default:
      claimCopy = `If you are a UK taxpayer and would like to Gift Aid your donation, Comic Relief can claim an additional 25% of the value of your donation from HMRC, it won't cost you a penny but means your donation can go even further. To edit your Gift Aid declaration, please do so below.`;
    break;
  };

  return (
    <React.Fragment>
      <h2 className="sub-title">
        <div>Thank you so much for supporting Comic Relief.</div>
      </h2>
      <p className="text-align-centre sub-title--copy">
        {claimCopy}
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
