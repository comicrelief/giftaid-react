import React from 'react';

import FormContext from '../../context/FormContext';

const Form = ({children, ...props}) => {

  // initialise form context
  const formContext = React.useContext(FormContext);

  return (
    <main role="main">
      <section>
        <form
          id="form"
          noValidate
          className={props.className}
          data-success={formContext.dataSuccess}
          data-error={formContext.dataError}
        >
          { children }
        </form>
      </section>
    </main>
  );
};

export default Form;
