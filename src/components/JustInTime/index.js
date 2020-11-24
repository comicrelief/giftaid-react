import React from 'react';

// import components
import JustInTime from '@comicrelief/storybook/src/components/JustInTime/JustInTime';
import SubmitMessage from './SubmitMessage';
import UpdateMessage from './UpdateMessage';

const JustInTimeComponent = props => (
  <JustInTime linkText={props.text}>
    {
        props.submit || props.submit !== undefined
          ? <SubmitMessage />
          : <UpdateMessage />
      }
  </JustInTime>

);

export default JustInTimeComponent;
