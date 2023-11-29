import React from 'react';
import SiteService from '../../../service/Site.service';

const SubmitHeader = (props) => {

  const site = new SiteService();
  switch(site.getSite()) {
    case 'BIGNIGHTIN':
      return (
        <React.Fragment>
          <h2 className="sub-title">
            <div>
              Gift aid your donation and the
              {' '}
              <strong>
                Government will give 25%
              </strong>
              {' '}
              on top of it.  This will be split 50/50 between Comic Relief and BBC Children in Need as per your donation.
            </div>
          </h2>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <h2 className="sub-title">
            <div>
            Thank you so much for your donation to Comic Relief.
            </div>
          </h2>

          <p className="text-align-centre sub-title--copy">
          If you are a UK taxpayer and would like to Gift Aid your donation, Comic Relief can claim an additional 25% of the value of your donation from HMRC, it won't cost you a penny but means your donation can go even further. To say 'yes' to Gift Aid, please complete the details below.
        </p>
        </React.Fragment>
      );
  }
};

export default SubmitHeader;
