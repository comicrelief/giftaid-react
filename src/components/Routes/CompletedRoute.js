import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AppContext from '../../context/AppContext';

export default ({ component: C, props: cProps, ...rest }) => {

  const app = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={ props => (app.isCompleted ? <C {...props} /> : <Redirect to="/" />)}
    />
  );
};
