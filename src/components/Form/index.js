import React from 'react';

const Form = ({children, ...props}) => {

  return (
    <main role="main">
      <section>
        <form
          id="form"
          noValidate
          className={props.className}
          data-success={props.formDataSuccess}
          data-error={props.formDataError}
        >
          { children }
        </form>
      </section>
    </main>
  );
};

export default Form;
