import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AppContext from '../../context/AppContext';

export default ({ component: C, props: cProps, ...rest }) => {
  const app = useContext(AppContext);

  const redirectPath = window.location.pathname === 'success'
  || window.location.pathname === '/success' ? '/' : '/update';

  return (
    <Route
      {...rest}
      render={props => (app.isCompleted ? <C {...props} /> : <Redirect to={redirectPath} />)}
    />
  );
};
