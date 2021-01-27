/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Formik } from 'formik';
import { WithOnValidationChangeHandler, WithOnChangeHandler } from 'formik-form-callbacks';

// All required for new Marketing
import {
  ThemeProvider,
  crTheme,
  MarketingPreferencesDS
} from '@comicrelief/component-library';

// import components
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup';
import MarketingConsent from '@comicrelief/storybook/src/components/MarketingConsent/MarketingConsent';
import { setInitialValues, buildValidationSchema } from './marketingPrefsConfig';

import Form from '../../../components/Form/index';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton/index';
import InputFields from '../../../components/InputFields/InputFields';
import JustInTime from '../../../components/JustInTime/index';

// fields data
import submitFormFields from './SubmitFormFields';
import marketingConsentData from './marketingConsentData';

// Util functions
import { mergeInputFieldProps } from '../utils/Utils';

// import context
import FormContext from '../../../context/FormContext';
import BigNightInCopy from './BigNightInCopy';

// Site config
import SiteService from '../../../service/Site.service';

// let formikErrors = {};

const site = new SiteService();

/* START: New Marketing preferences config */
const new_MP_initialValues = setInitialValues();
const new_MP_validation = buildValidationSchema();
const { validationSchema, options } = new_MP_validation;
/* END: New Marketing preferences config */

function SubmitForm(submitProps) {
  // initialise context
  const {
    refs,
    setFieldValidity,
    postCodePattern,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
    setFieldValidation,
    submitForm
  } = useContext(FormContext); // get states from context

  const { msisdn } = submitProps;

  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState([]); // initialise form inputFieldProps state

  const marketingProps = {};

  // Set additional props for MarketingConsent based on site
  if (site.getSite() === 'BIGNIGHTIN') {
    marketingProps.copy1 = BigNightInCopy.copy1;
    marketingProps.copy2 = BigNightInCopy.copy2;
  }

  /**
   * Handle set input fields
   */
  const setInputField = () => {
    if (msisdn !== undefined && msisdn !== null) {
      let mobileNumber = msisdn;
      if (msisdn.startsWith('44')) {
        mobileNumber = msisdn.replace('44', '0'); // replace starting 44 with 0
      }
      // Update validation field
      fieldValidation.mobile.valid = true;
      fieldValidation.mobile.value = mobileNumber;

      // set form input to value
      document.getElementById('field-input--mobile').value = mobileNumber;

      // update input field property
      submitFormFields.phoneNumber.fieldValue = { valid: true, value: mobileNumber, message: '' };
    }
    setFieldValidation(fieldValidation);
    // merge input fields with default form fields
    setInputFieldProps(mergeInputFieldProps(submitFormFields, submitProps.inputFieldOverrides));
  };

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Handle set input fields on component mount
    setInputField();
    return () => {
      setInputFieldProps([]); // reset on component unmount
    };
  });

  // Customised wrapper function
  const customSetFieldValue = (name, value, setFieldValue) => {
    setFieldValue(name, value);
    // Force validation to remove any old errors?
  };

  const passFormikValidation = (values, errors) => {
    Object.keys(values).forEach(key => {
      const thisError = errors[key];
      let thisVal = typeof values[key] === 'string' ? values[key] : values[key][0]; // Handle checkboxes.. TO-DO: maybe do this within component?
      thisVal = (thisVal !== undefined ? thisVal : null); // Handles the empty checkbox array from Formik

      const validityObject = {
        value: thisVal, // TO-DO: for some reason, the value reset (when re-hiding the field) isn't reflected here..
        valid: thisError === undefined,
        showErrorMessages: thisError !== undefined,
        message: thisError
      };

      setFieldValidity(validityObject, key);
    });
  };

  return (

    <ThemeProvider theme={crTheme}>

      <Formik
        validationSchema={validationSchema}
        initialValues={new_MP_initialValues}
        validateOnChange={false}
        validateOnBlur
        validateOnMount
        validate={values => { console.log('Validate:', values); }}

      >{({
        handleChange, setFieldValue, setFieldTouched, isValid, values, errors, touched
      }) => (

        <Form className="giftaid__form" NoValidate>
          <FormHeader page="submit" />
          <InputFields allFields={inputFieldProps} />

          <PostcodeLookup
            ref={refs}
            label="Postal address"
            showErrorMessages={formValidityState.showErrorMessages}
            pattern={postCodePattern}
            isAddressValid={
          validation => { Object.keys(validation).map(key => setFieldValidity(validation[key], key)); }}
          />

          <MarketingPreferencesDS
            formValues={values}
            handleInputChange={handleChange}
            handleCheckChange={(name, value) => customSetFieldValue(name, value, setFieldValue)}
            handleTouchedReset={setFieldTouched}
            validation={{ errors, touched, options }}
          />

          {/* As Formik doesn't provide callbacks, let's use this handy plugin to pass values and errors
          to the existing validation functionality any value or validation event happens */}
          <WithOnChangeHandler>
            {() => { passFormikValidation(values, errors); }}
          </WithOnChangeHandler>

          <WithOnValidationChangeHandler>
            {() => { passFormikValidation(values, errors); }}
          </WithOnValidationChangeHandler>

          <MarketingConsent
            getValidation={validation => {
              Object.keys(validation).forEach(key => setFieldValidity(validation[key], key));
            }}
            itemData={marketingConsentData}
            showErrorMessages={formValidityState.showErrorMessages}
            {...marketingProps}
          />

          <FormButton onClick={e => submitForm(e)} text="Gift Aid your donation" />

          <JustInTime submit text={justInTimeLinkText} />

        </Form>
      )}

      </Formik>

    </ThemeProvider>

  );
}
SubmitForm.defaultProps = {
  inputFieldOverrides: {},
  history: { push: { } }
};
SubmitForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
  history: propTypes.shape(propTypes.shape)
};

export default SubmitForm;
