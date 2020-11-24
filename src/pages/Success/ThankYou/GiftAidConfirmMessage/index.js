import React from 'react';

import SiteService from '../../../../service/Site.service';

const GiftAidConfirmMessage = props => {
  const site = new SiteService();
  const isBigNightIn = site.getSite() === 'BIGNIGHTIN';

  return (
    <div>
      <h1>Thank you, <br /> {props.firstname}!</h1>

      {isBigNightIn
        ? (
          <p>
            Your donation makes a big difference, we’ve registered your Gift Aid declaration.
            The Government will give 25% on top of your donation. This will be split 50/50 between Comic Relief and BBC Children in Need.
          </p>
        )
        : (
          <p>
            We’ve registered your Gift Aid declaration,
            we’ll use it to pay for our operational costs.
          </p>
        )
         }
    </div>
  );
};

export default GiftAidConfirmMessage;
