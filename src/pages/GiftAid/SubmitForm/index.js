import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

// Components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";
import MarketingConsent from '@comicrelief/storybook/src/components/MarketingConsent/MarketingConsent';

import Form from '../../../components/Form';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton';
import InputFields from "../../../components/InputFields/InputFields";
import JustInTime from "../../../components/JustInTime";

// fields data
import {
  defaultFormFields,
  defaultSubmitFormFieldValidations,
  marketingConsentData
} from './defaultFormFields';

// Get util functions
import { getPathParams } from '../utils/getPathParams';

// Function to get form values
import { getFormValues } from '../utils/getFormValues';

//Context provider
import { FormProvider } from '../../../context/FormContext';

let scrollTimeout;

function SubmitForm(props) {

  // Declare state variables
  const [validation, setValidation] = useState(defaultSubmitFormFieldValidations); // initialise form fields validation state

  const [inputFieldProps, setInputFieldProps] = useState([]); // initialise form inputFieldProps state

  const [validating, setValidating] = useState(false); // initialise form validating state
  const [formValidity, setFormValidity] = useState(false); // initialise form validity state
  const [showErrorMessages, setShowErrorMessages] = useState(false);  // initialise form error message state
  const [formDataError, setFormDataError] = useState(null); // initialise form data error state
  const [formDataSuccess, setFormDataSuccess] = useState(null); // initialise form data success state

  const [refs, setRefs] = useState(null); // initialise form fields refs state

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Reset states on component unmount
    return () => {
      setFormDataError(undefined);
      setFormDataSuccess(undefined);
      setRefs(undefined);
    }
  });

  /**
   * Handle set input fields
   * on component mount
   */
  useEffect(() => {
    setInputField();
  },[]);

  /**
   * Handle set input fields
   */
  const setInputField = () => {
    setInputFieldProps(mergeInputFieldProps(defaultFormFields))
  };

  /**
   * Merge default input field properties with overrides.
   * @param defaultInputFieldsProps
   * @returns {object}
   */
  const mergeInputFieldProps = (defaultInputFieldsProps) => {
    const inputFields = defaultInputFieldsProps;
    const overrides = props.inputFieldOverrides;
    Object.entries(overrides).forEach(([key]) => {
      Object.assign(inputFields[key], overrides[key]);
    });
    return inputFields;
  };


  /**
   * Updates validation state
   * @param newStateField
   * @param name
   */
  const setValidity = (newStateField, name) => {
    if (name && newStateField) {
      let newState;
      const prevStateField = validation[name];
      const fieldUndefined = prevStateField === undefined;
      const newValue = fieldUndefined === false && prevStateField.value !== newStateField.value;
      const marketingConsentFieldsChanged = fieldUndefined === false &&
        (newStateField.fieldValidation !== prevStateField.fieldValidation);

      if (fieldUndefined === true || newValue === true || marketingConsentFieldsChanged === true) {
        setValidation({...validation, [name]: newStateField});
        newState = {
          ...validation,
        };
      }
      return newState;
    }
  };

  /**
   * Handle scroll to error on
   * component update
   */
  useEffect(() => {
    if (showErrorMessages && !formValidity && validating) {
      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { scrollToError(); }, 500);
    }
  });

  /**
   * Scrolls to and focuses on field with error
   */
  const scrollToError = () => {
    setValidating(false);
    props.scrollToError();
    clearTimeout(scrollTimeout);
  };

  /**
   * Validates and submits form.
   * @param e
   */
  const validateForm = (e) => {
    e.preventDefault();

    const formValues = getFormValues(validation);

    let validity = props.getValidation(validation);

    if (validity !== true ) {
      // update states accordingly
      setFormValidity(false);
      setShowErrorMessages(true);
      setValidating(true);

      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { scrollToError(); }, 500);

    } else {
      // update states accordingly
      setFormValidity(true);
      setShowErrorMessages(false);
      setValidating(false);

      // Get submit params
      const params = getPathParams(false);

      props.submit(formValues, params);
    }
  };


  const childProps = {
    showErrorMessages: showErrorMessages,
    formDataSuccess: formDataSuccess,
    formDataError: formDataError,
    refs: refs,
    setValidity: setValidity,
  };

  return (
    <FormProvider value={childProps}>
      <Form
        className="giftaid__form"
      >
        <FormHeader
          page="submit"
        />

        <InputFields
          allFields={inputFieldProps}
        />

        <PostcodeLookup
          ref={refs}
          label="Postal address"
          showErrorMessages={showErrorMessages}
          pattern={props.postCodePattern}
          isAddressValid={
            (validation) => {
              Object.keys(validation).map(key => setValidity(validation[key], key));
            }
          }
        />
        <MarketingConsent
          getValidation={(validation) => {
            Object.keys(validation).forEach(key => setValidity(validation[key], key));
          }}
          itemData={marketingConsentData}
          showErrorMessages={showErrorMessages}
        />
        <FormButton
          onClick={e => validateForm(e)}
          text="Gift Aid your donation"
        />

        <JustInTime
          submit
          text={props.justInTimeLinkText}
        />
      </Form>
    </FormProvider>
  );
}
SubmitForm.defaultProps = {
  inputFieldOverrides: {},
  history: { push: { } },
};
SubmitForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
};

export default SubmitForm;
