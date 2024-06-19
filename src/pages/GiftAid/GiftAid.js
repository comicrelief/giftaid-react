import React, { useState, useEffect, useContext, useRef } from "react";

import propTypes from "prop-types";
import axios from 'axios';

// import components
import UpdateForm from './UpdateForm';
import SubmitForm from './SubmitForm';

// context
import AppContext from '../../context/AppContext';

//Context provider
import { FormProvider } from '../../context/FormContext';

// Import utility functions
import {
  getFormValues,
  scrollToError,
  getPathParams,
  hiddenFields,
  justInTimeLinkText,
  validateForm,
  getFieldValidations,
  initialFormValidity,
  getRoute,
} from './utils/Utils';

function GiftAid(props) {

  // initialise and get props from context
  const { setIsCompleted, setSuccessState } = useContext(AppContext);

  // Declare states
  const isUpdate = props.location.pathname.includes("update"); // initialise updating param state
  const [isUpdateForm, setIsUpdateForm] = useState(isUpdate); // set to true if path contains the string update
  const [pathParams, setPathParams] = useState({}); // initialise submit path param state
  const [formValidityState, setFormValidityState] = useState(initialFormValidity); // intitialise form validity states
  const [fieldValidation, setFieldValidation] = useState(getFieldValidations(isUpdate)); // intitialise field validation state based on form type
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // initialise URL token state if available
  const [token, setToken] = useState(props.match.params.token);

  // initialise MSISDN state
  const [msisdn, setMSISDN] = useState(null);

  /**
   * GiftAid component mounts
   */
  useEffect(() => {
    setPathParams(getPathParams(isUpdateForm)); // update path states
    setToken(props.match.params.token); // update token state
    if (token) {
      decryptToken(token); // decrypt token to MSISDN
    }
    return () => {
      // GiftAid component unmounts
      // reset states
      setFormValidityState(initialFormValidity);
      setFieldValidation({});
      setIsUpdateForm(false);
      setToken(null);
      setMSISDN(null);
    }
  }, []);

  /**
   * Fetches decrypted MSISDN using token
   * @param cipherText
   */
  const decryptToken = (cipherText) => {
    if (cipherText) {
      axios.get(getRoute(`token/get/${cipherText}`)) // send request to endpoint
        .then((response) => {
          if (response.data.data.status === 'success') {
            setMSISDN(response.data.data.response);
          }
        })
        .catch()
    }
  };


  /**
   * Handle validity state on component update
   */
  useEffect(() => {
    // Update validation accordingly on update
    if ((formValidityState.showErrorMessages && !formValidityState.formValidity && formValidityState.validating)) {
      // update validation state
      setFormValidityState({
        ...formValidityState,
        validating: false,
      });
    }
  }, []);

  /**
   * Updates validation state for form fields
   * @param thisFieldsState
   * @param thisFieldsName
   */
  const setFieldValidity = (thisFieldsState, thisFieldsName) => {
    const thisFieldsPreviousState = fieldValidation[thisFieldsName];
    const isFieldUndefined = thisFieldsPreviousState === undefined;
    const isFieldValueUndefined = typeof thisFieldsPreviousState !== 'undefined' && thisFieldsPreviousState.value === undefined;
    const isNewFieldValue = typeof thisFieldsPreviousState !== 'undefined' && thisFieldsPreviousState.value !== thisFieldsState.value;
    const isUpdatedState = (isFieldUndefined === false && isNewFieldValue) || (isFieldValueUndefined === true || isNewFieldValue);
    
    // set field validation for marketing consent fields if present
    const marketingConsentFieldsChanged = isFieldUndefined === false &&
      (thisFieldsState.fieldValidation !== thisFieldsPreviousState.fieldValidation);

    if ((thisFieldsPreviousState && isUpdatedState) || marketingConsentFieldsChanged === true) {
        fieldValidation[thisFieldsName] = thisFieldsState;

        // Currently, on mount, each field's current 'valid' value is an empty string, rather than the boolean value it SHOULD be.
        //
        // Long story short, if the field isn't interacted with (like our optional Mobile field here potentially), it means the whole
        // form validation check fails due to that empty string.
        //
        // Additionally, there's an issue around non-required fields. We do actually set the appropriate config in SubmitFormFields and
        // UpdateFormFields, but it's not being used at all for reasons I haven't uncovered yet, very helpfully doing nothing with the 'required' flag.
        // 
        // This short-term fix below effectively shortcircuits the validation for our non-required 'mobile' UpdateForm field when it's empty:
        if (isUpdate && thisFieldsName === 'mobile' && thisFieldsState.value === '' ) {
          fieldValidation[thisFieldsName].valid = true;
        }

        setFieldValidation({...fieldValidation});

        return {
          ...fieldValidation,
        };
    }
  };

  /**
   * Validates and Submits form
   * and redirects to success or sorry page
   * @param e
   */
  const submitForm = (e) => {
    e.preventDefault();
    const formValues = getFormValues(fieldValidation); // get form values
    const { validity, validationState } = validateForm(fieldValidation, formValues, formValidityState); // validate form
    setFormValidityState(validationState); // update form validation state

    if (validity) { // submit form if no errors
      setIsSubmitting(true); // Update state that's passed down to disable button during submission
      // Rather than mess with the input field value itself (crummy UX), just sanitise the value on submission,
      // removing any leading or trailing whitespace that the new regex brings allows for (see ENG-3193) 
      
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
    } else {
      setTimeout(() => {
        scrollToError(formValidityState);
      }, 500);
    }
    return null;
  };


  // Pass context props to child components
  const contextProps = {
    hiddenFields,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
    setFieldValidation: (validation) => setFieldValidation(validation),
    setFieldValidity: (state, name) => setFieldValidity(state, name),
    refs: inputRef,
    submitForm: (e) => submitForm(e),
    isSubmitting
  };

  return (
    <FormProvider value={contextProps}>

      { isUpdateForm ? (
        <UpdateForm
          title="Update Form"
        />
      ) : (
        <SubmitForm
          title="Submit Form"
          msisdn={msisdn}
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
