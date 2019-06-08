import React from 'react';

import Loading from "../../components/Loading";

const Message = React.lazy(() => import('./Message'));

const Sorry = (props) => {

  return (
    <React.Suspense fallback={ <Loading />}>

      <div className="container">

        <div className="container--inner">

          <h1>Sorry!</h1>

          <Message />

          <p className="message-support-title">
            Thanks for your support.
          </p>

        </div>

      </div>

    </React.Suspense>
  );
};

export default Sorry;
