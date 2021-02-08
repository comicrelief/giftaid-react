/* eslint-disable no-unreachable */
import React, {
  useState, useEffect, useContext, useRef
} from 'react';

import propTypes from 'prop-types';
import axios from 'axios';

// import components
import UpdateForm from './UpdateForm';
import SubmitForm from './SubmitForm';

// context
import AppContext from '../../context/AppContext';

// Context provider
import { FormProvider } from '../../context/FormContext';

// Import utility functions
import {
  getFormValues,
  scrollToError,
  getPathParams,
  hiddenFields,
  postCodePattern,
  justInTimeLinkText,
  validateForm,
  getFieldValidations,
  initialValidity,
  getRoute
} from './utils/Utils';

let scrollTimeout;

function GiftAid(props) {
  // initialise and get props from context
  const { setIsCompleted, setSuccessState } = useContext(AppContext);

  // Declare states
  const isUpdatePage = props.location.pathname.includes('update'); // initialise updating param state
  const [isUpdating, setIsUpdating] = useState(isUpdatePage); // set to true if path contains the string update
  const [pathParams, setPathParams] = useState({}); // initialise submit path param state
  const [formValidityState, setFormValidityState] = useState(initialValidity); // intitialise form validity states
  const [fieldValidation, setFieldValidation] = useState(getFieldValidations(isUpdatePage)); // intitialise field validation state based on form type
  const inputRef = useRef(null);

  // initialise URL token state if available
  const [token, setToken] = useState(props.match.params.token);

  // initialise MSISDN state
  const [msisdn, setMSISDN] = useState(null);

  // initialise URL transaction id state if available
  const [urlTransactionId, setUrlTransactionId] = useState(props.match.params.transaction_id);

  /**
   * Fetches decrypted MSISDN using token
   * @param cipherText
   */
  const decryptToken = cipherText => {
    if (cipherText) {
      axios.get(getRoute(`token/get/${cipherText}`)) // send request to endpoint
        .then(response => {
          if (response.data.data.status === 'success') {
            setMSISDN(response.data.data.response);
          }
        })
        .catch();
    }
  };

  /**
   * GiftAid component mounts
   */
  useEffect(() => {
    setPathParams(getPathParams(isUpdating)); // update path states
    setToken(props.match.params.token); // update token state
    setUrlTransactionId(props.match.params.transaction_id); // update url transaction id state
    if (token) {
      decryptToken(token); // decrypt token to MSISDN
    }
    return () => {
      // GiftAid component unmounts
      // reset states
      setFormValidityState(initialValidity);
      setFieldValidation({});
      setIsUpdating(false);
      setUrlTransactionId(null);
      setToken(null);
      setMSISDN(null);
    };
  }, [props.match.params.token, props.match.params.transaction_id, token, isUpdating]);

  /**
   * Handle validity state on component update
   */
  useEffect(() => {
    // if validation fails, scroll to error
    if ((formValidityState.showErrorMessages && !formValidityState.formValidity
      && formValidityState.validating) || formValidityState.urlTransactionId.valid === false) {
      // update validation state
      setFormValidityState({
        ...formValidityState,
        validating: false
      });
    }
  }, [formValidityState]);

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
    };
  });

  /**
   * Updates validation state for form fields
   * @param childState
   * @param name
   */
  const setFieldValidity = (childState, name) => {
    if (name.includes('mp')) {
      // console.log('MP field', name);
      // TO-DO: switch statement to map mobile, and address fields to MP counterparts
      // if (name === 'mobile') {
      //   console.log('mobile is:', childState.value);
      // }
    }

    const prevStateField = fieldValidation[name]; // what's been stored before
    const fieldUndefined = prevStateField === undefined; // if we haven't already stored anything for this field
    const valueUndefined = typeof prevStateField !== 'undefined' && prevStateField.value === undefined; // if we HAVE stored it previously but with no value
    const newValue = typeof prevStateField !== 'undefined' && prevStateField.value !== childState.value; // if we HAVE stored the field before and the value has changed
    const newState = (fieldUndefined === false && newValue) || (valueUndefined === true || newValue); // if we're updating an existing field, or

    if ((prevStateField && newState)) {
      if (name === 'emailaddress' && childState.value === '') { // make email field optional
        setFieldValidation({
          ...fieldValidation,
          emailaddress: {
            valid: true,
            value: childState.value,
            message: childState.message,
            showErrorMessage: false
          }
        });
      } else {
        // Reset url transaction Id state
        if (name === 'transactionId' && childState.valid) {
          setFormValidityState({
            ...formValidityState,
            urlTransactionId: {
              ...formValidityState.urlTransactionId,
              valid: true
            }
          });
        }

        fieldValidation[name] = childState;
        setFieldValidation({ ...fieldValidation });

        return {
          ...fieldValidation
        };
      }
    } return null;
  };

  /**
   * Validates and Submits form
   * and redirects to success or sorry page
   * @param e
   */
  const submitForm = e => {
    e.preventDefault();
    const formValues = getFormValues(fieldValidation, urlTransactionId, isUpdating); // get form values
    const { validity, validationState } = validateForm(fieldValidation, formValues, formValidityState); // validate form
    setFormValidityState(validationState); // update form validation state

    if (validity) { // submit form if no errors
      // console.log('formValues', formValues);
      axios.post(pathParams.endpoint, formValues) // post form data and settings to endpoint
        .then(() => {
          setIsCompleted(true); // set completed state
          setSuccessState({ // set success page variables
            firstname: formValues.firstname,
            giftAidChoice: formValues.confirm
          });
          props.history.push({
            pathname: pathParams.successPath // redirect to success page
          });
        })
        .catch(() => {
          props.history.push({
            pathname: pathParams.sorryPath // redirect to failure page
          });
        });
    }
    return null;
  };

  // Pass context props to child components
  const contextProps = {
    urlTransactionId,
    hiddenFields,
    postCodePattern,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
    setFieldValidation: validation => setFieldValidation(validation),
    setFieldValidity: (state, name) => setFieldValidity(state, name),
    refs: inputRef,
    submitForm: e => submitForm(e)
  };

  return (
    <FormProvider value={contextProps}>

      { isUpdating ? (
        <UpdateForm
          title="Update Form"
          urlTransactionId={urlTransactionId}
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
  history: { push: { } }
};
GiftAid.propTypes = {
  history: propTypes.shape(propTypes.shape)
};

export default GiftAid;
