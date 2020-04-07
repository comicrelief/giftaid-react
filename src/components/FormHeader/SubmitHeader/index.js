import React from 'react';

const SubmitHeader = (props) => {

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
};

export default SubmitHeader;
