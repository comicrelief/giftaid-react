import React, {useContext} from 'react';

// import context
import FormContext from '../../context/FormContext';

const Form = ({children, ...props}) => {

  const { formValidityState } = useContext(FormContext); // get states from context

  return (
    <main role="main">
      <section>
        <form
          id="form"
          noValidate
          className={props.className}
          data-success={formValidityState.formDataSuccess}
          data-error={formValidityState.formDataError}
        >
          { children }
        </form>
      </section>
    </main>
  );
};

export default Form;
