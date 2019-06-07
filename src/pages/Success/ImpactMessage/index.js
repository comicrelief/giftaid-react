import React from 'react';

const ImpactMessage = () => {

  return (
    <React.Fragment>
      <h2>Your donation makes a big difference</h2>
      <p>
        Comic Relief currently supports more than 2,000 projects in the UK and around
        the world, tackling issues like gender injustice and mental illness.
      </p>
      <div>
        <a href="https://www.comicrelief.com/your-impact" className="btn btn--red">
          Read More
        </a>
      </div>
    </React.Fragment>
  );
};

export default ImpactMessage;
