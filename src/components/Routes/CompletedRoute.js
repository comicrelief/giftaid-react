import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import FormContext from '../../context/FormContext';

export default ({ component: C, props: cProps, ...rest }) => {

  const form = useContext(FormContext);

  return (
    <Route
      {...rest}

      render={props =>
        (form.isCompleted
          ? <C {...props} />
          : <Redirect
            to="/"
          />)}
    />
  );
};
