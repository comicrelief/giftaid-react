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
              Gift aid your donation and the
              {' '}
              <strong>
                Government will give us 25%
              </strong>
              {' '}
              on top of it.
            </div>
          </h2>
        </React.Fragment>
      );
  }
};

export default SubmitHeader;
