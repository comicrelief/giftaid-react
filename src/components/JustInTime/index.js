import React from 'react';

import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';

const SubmitMessage = React.lazy(() => import('./SubmitMessage'));
const UpdateMessage = React.lazy(() => import('./UpdateMessage'));

const JustInTimeComponent = (props) => {

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  return (
    <React.Suspense fallback={loading()}>
      <JustInTime linkText={props.text}>
        {
          props.submit || props.submit !== undefined
          ? <SubmitMessage/>
          : <UpdateMessage/>
        }
      </JustInTime>
    </React.Suspense>

  );
};

export default JustInTimeComponent;
