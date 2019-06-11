import React, { useState, useEffect, useContext, useRef } from "react";

import propTypes from "prop-types";
import axios from 'axios';

// import components
import UpdateForm from '../../components/Form/UpdateForm';
import SubmitForm from '../../components/Form/SubmitForm';


// context
import AppContext from '../../context/AppContext';

//Context provider
import { FormProvider } from '../../context/FormContext';

// Get util functions
import { getFormValues } from './utils/getFormValues';
import { getPathParams } from './utils/getPathParams';
import { validateForm } from './utils/validateForm';
import { scrollToError } from './utils/scrollToError';
import {
  getFieldValidations,  // form field validations
  initialValidity // form validity initial values
} from './utils/getValidations';

// get default variables
import { hiddenFields, postCodePattern, justInTimeLinkText } from './utils/giftaidDefaults';

let scrollTimeout;

function GiftAid(props) {

  // initialise and get props from context
  const { setIsCompleted, setSuccessState } = useContext(AppContext);

  // Declare states
  const update = props.location.pathname.includes("update"); // initialise updating param state

  const [updating, setUpdating] = useState(update); // set to true if path contains the string update

  const [pathParams, setPathParams] = useState({}); // initialise submit path param state

  const [formValidityState, setFormValidityState] = useState(initialValidity); // intitialise form validity states

  const [fieldValidation, setFieldValidation] = useState(getFieldValidations(update)); // intitialise field validation state based on form type

  const inputRef = useRef(null);

  // initialise URL transaction id state if available
  const [urlTransactionId, setUrlTransactionId] = useState(props.match.params.transaction_id);

  /**
   * GiftAid component mounts
   */
  useEffect(() => {
    setPathParams(getPathParams(updating));
    return () => { // GiftAid component unmounts
      // reset states
      setFormValidityState(initialValidity);
      setFieldValidation({});
      setUpdating(false);
      setUrlTransactionId(null);
    }
  }, []);

  /**
   * Handle validity state on component update
   */
  useEffect(() => {
    // if validation fails, scroll to error
    if ((formValidityState.showErrorMessages && !formValidityState.formValidity
      && formValidityState.validating) || formValidityState.urlTransactionId.valid === false ) {

      // update validation state
      setFormValidityState({
        ...formValidityState,
        validating: false,
      });
    }
  }, []);

  /**
   * Handle scroll to error on component update
   */
  useEffect(() => {
    scrollTimeout = setTimeout(() => {
      scrollToError(formValidityState);
    }, 500);
    return () => {
      // clear timeout on component unmount
      clearTimeout(scrollTimeout);
    }
  });


  /**
   * Updates validation state for form fields
   * @param childState
   * @param name
   */
  const setFieldValidity = (childState, name) => {

    const prevStateField = fieldValidation[name];
    const fieldUndefined = prevStateField === undefined;
    const valueUndefined = typeof prevStateField !== 'undefined' && prevStateField.value === undefined;
    const newValue = typeof prevStateField !== 'undefined' && prevStateField.value !== childState.value;
    const newState = (fieldUndefined === false && newValue) || (valueUndefined === true || newValue);

    // set field validation for marketing consent fields if present
    const marketingConsentFieldsChanged = fieldUndefined === false &&
      (childState.fieldValidation !== prevStateField.fieldValidation);

    if ((prevStateField && newState) || marketingConsentFieldsChanged === true) {
      if (name === 'emailaddress' && childState.value === '') { // make email field optional
        setFieldValidation({
          ...fieldValidation,
          emailaddress: {
            valid: true,
            value: childState.value,
            message: childState.message,
            showErrorMessage: false,
          },
        });
      } else {
        // Reset url transaction Id state
        if (name === 'transactionId' && childState.valid) {
          setFormValidityState({
            ...formValidityState,
            urlTransactionId: {
              ...formValidityState.urlTransactionId,
              valid: true,
            }
          });
        }
        setFieldValidation({...fieldValidation, [name]: childState});
        return {
          ...fieldValidation,
        };
      }
    }
  };

  /**
   * Validates and Submits form
   * and redirects to success or sorry page
   * @param e
   */
  const submitForm = (e) => {

    e.preventDefault();

    const formValues = getFormValues(fieldValidation, urlTransactionId, updating); // get form values
    const { validity, validationState } = validateForm(fieldValidation, formValues, formValidityState); // validate form
    setFormValidityState(validationState); // update form validation state

    if (validity) { // submit form if no errors
      axios.post(pathParams.endpoint, formValues) // post form data and settings to endpoint
        .then(() => {
          setIsCompleted(true); // set completed state
          setSuccessState({ // set success page variables
            firstname: formValues.firstname,
            giftAidChoice: formValues.confirm,
          });
          props.history.push({
            pathname: pathParams.successPath, // redirect to success page
          });
        })
        .catch(() => {
          props.history.push({
            pathname: pathParams.sorryPath, // redirect to failure page
          });
        });
    }
    return null;
  };



  // Pass context props to child components
  const childProps = {
    urlTransactionId,
    hiddenFields,
    postCodePattern,
    justInTimeLinkText,
    refs: inputRef,
    formValidityState,
    fieldValidation,
    setFieldValidation: (validation) => setFieldValidation(validation),
    submitForm: (e) => submitForm(e),
    setFieldValidity: (state, name) => setFieldValidity(state, name)
  };

  return (
    <FormProvider value={childProps}>

      { updating ? (
        <UpdateForm
          title="Update Form"
        />
      ) : (
        <SubmitForm
          title="Submit Form"
        />
      )}
    </FormProvider>
  );
}

GiftAid.defaultProps = {
  inputFieldOverrides: {},
  history: { push: { } },
};
GiftAid.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
};

export default GiftAid;
