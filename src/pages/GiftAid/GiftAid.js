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
  GBPostCodePattern,
  OverseasPostCodePattern,
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
  const update = props.location.pathname.includes("update"); // initialise updating param state
  const [updating, setUpdating] = useState(update); // set to true if path contains the string update
  const [pathParams, setPathParams] = useState({}); // initialise submit path param state
  const [formValidityState, setFormValidityState] = useState(initialFormValidity); // intitialise form validity states
  const [fieldValidation, setFieldValidation] = useState(getFieldValidations(update)); // intitialise field validation state based on form type
  const [isSubmitting, setIsSubmitting] = useState(false);
  // As GB is the default country, set the matching postcode regex pattern as default too
  const [currentPostcodePattern, setCurrentPostcodePattern] = useState(GBPostCodePattern);

  // Simple counter to allow us to trigger the child 'revalidate postcode' function after regex updates
  const [postcodeRevalidate, setPostcodeRevalidate] = useState(0);

  const inputRef = useRef(null);

  // initialise URL token state if available
  const [token, setToken] = useState(props.match.params.token);

  // initialise MSISDN state
  const [msisdn, setMSISDN] = useState(null);

  // initialise URL transaction id state if available
  const [urlTransactionId, setUrlTransactionId] = useState(props.match.params.transaction_id);

  /**
   * GiftAid component mounts
   */
  useEffect(() => {
    setPathParams(getPathParams(updating)); // update path states
    setToken(props.match.params.token); // update token state
    setUrlTransactionId(props.match.params.transaction_id); // update url transaction id state
    if (token) {
      decryptToken(token); // decrypt token to MSISDN
    }
    return () => {
      // GiftAid component unmounts
      // reset states
      setFormValidityState(initialFormValidity);
      setFieldValidation({});
      setUpdating(false);
      setUrlTransactionId(null);
      setToken(null);
      setMSISDN(null);
    }
  }, []);

  /**
  * Crummy workaround to trigger a revalidation
  * as the bespoke validation here has issues
  */
    const revalidatePostcode = () => {
      // Store the current postcode to re-add
      const postcodeField = document.getElementById("field-input--postcode");
      const currentPostcodeValue = postcodeField.value;
      const blurEvent = new Event('blur', { bubbles: true });

      // Temporarily reset the postcode field and programmatically
      // trigger a blur event to make the validation take notice
      postcodeField.value = '';
      postcodeField.dispatchEvent(blurEvent);

      setTimeout(() => {
        // Immediately re-add the value and trigger another blur event
        postcodeField.value = currentPostcodeValue;
        postcodeField.dispatchEvent(blurEvent);
      }, 1);
    };


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
      
      // Update postcode regex is 'Country' select value has changed
      if (thisFieldsName === 'country' && thisFieldsState.value !== thisFieldsPreviousState.value){

        // Ignore the on-mount validation call
        if (thisFieldsPreviousState.value !== undefined) {
          // Switch regex patterns accordingly; if a non-GB value, this undefined value
          // will cause the PCLU to fallback to its default, much looser regex
          setCurrentPostcodePattern(thisFieldsState.value === 'GB' ? GBPostCodePattern : undefined);
          // Call our workaround to trigger a revalidation of the PCLU postcode field
          revalidatePostcode();
        }
      }

        // Reset url transaction Id state
        if (thisFieldsName === 'transactionId' && thisFieldsState.valid) {
          setFormValidityState({
            ...formValidityState,
            urlTransactionId: {
              ...formValidityState.urlTransactionId,
              valid: true,
            }
          });
        }
        fieldValidation[thisFieldsName] = thisFieldsState;
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
    const formValues = getFormValues(fieldValidation, urlTransactionId, updating); // get form values
    const { validity, validationState } = validateForm(fieldValidation, formValues, formValidityState); // validate form
    setFormValidityState(validationState); // update form validation state

    if (validity) { // submit form if no errors
      setIsSubmitting(true); // Update state that's passed down to disable button during submission
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
    urlTransactionId,
    hiddenFields,
    currentPostcodePattern,
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

      { updating ? (
        <UpdateForm
          title="Update Form"
          urlTransactionId={urlTransactionId}
        />
      ) : (
        <SubmitForm
          title="Submit Form"
          msisdn={msisdn}
          postcodeRevalidate={postcodeRevalidate}
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
