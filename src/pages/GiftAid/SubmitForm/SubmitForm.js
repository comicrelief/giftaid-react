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
import { setInitialValues, buildValidationSchema } from '@comicrelief/component-library/src/components/Organisms/MarketingPreferencesDS/_MarketingPreferencesDS';

import Form from '../../../components/Form/index';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton/index';
import InputFields from '../../../components/InputFields/InputFields';
import JustInTime from '../../../components/JustInTime/index';

// fields data
import submitFormFields from './SubmitFormFields';
// import marketingConsentData from './marketingConsentData';

// Util functions
import { mergeInputFieldProps } from '../utils/Utils';

// import context
import FormContext from '../../../context/FormContext';
import BigNightInCopy from './BigNightInCopy';

// Site config
import SiteService from '../../../service/Site.service';

const site = new SiteService();

/* START: New Marketing preferences config */
const initialMpValues = setInitialValues();
const mpValidation = buildValidationSchema();
const {
  validationSchema,
  validationOptions
} = mpValidation;
/* END: New Marketing preferences config */

function SubmitForm(submitProps) {
  // initialise context
  const {
    refs,
    setFieldValidity,
    setFieldValidation,
    postCodePattern,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
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
  const handleCheckChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
    // Force validation to remove any old errors?
  };

  const passFormikValidation = (values, errors, type) => {
    /// sconsole.log('passFormikValidation');
    Object.keys(values).forEach(key => {
      const thisError = errors[key];
      let thisVal = typeof values[key] === 'string' ? values[key] : values[key][0]; // Handle checkboxes
      thisVal = (thisVal !== undefined ? thisVal : null); // Handles the empty checkbox array from Formik

      // Validation object per how the existing 'setFieldValidity' function requires
      const validityObject = {
        value: thisVal,
        valid: thisError === undefined,
        showErrorMessages: thisError !== undefined,
        message: thisError !== undefined ? thisError : ''
      };

      // console.log('validityObject for', key, ':', validityObject);

      // 'setFieldValidity' is passed as context prop from GiftAid component;
      // this allows for Formik values/validation to be included in the overall validation
      // setFieldValidity(validityObject, key);
    });
  };

  return (
    <ThemeProvider theme={crTheme}>

      <Formik
        initialValues={initialMpValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        validateOnMount

      >{({
        handleChange, setFieldValue, setFieldTouched, isValid, values, errors, touched, validateField
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
            handleTouchedReset={setFieldTouched}
            validation={{ errors, touched, validationOptions }}
            setFieldValue={setFieldValue}
            validateField={validateField}
            // inputFieldOverrides={fieldOverrides}
          />

          {/* As Formik doesn't provide callbacks, let's use this handy plugin to pass values and errors
          to the existing validation functionality when a change happens */}
          <WithOnChangeHandler>
            {() => { passFormikValidation(values, errors); }}
          </WithOnChangeHandler>

          {/* TO-DO: unsure this happens on every required action; doesn't run on non-required fields */}
          {/* <WithOnValidationChangeHandler>
            {() => { passFormikValidation(values, errors, 'onValidate'); }}
          </WithOnValidationChangeHandler> */}

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
  // eslint-disable-next-line react/no-unused-prop-types
  inputFieldOverrides: propTypes.shape(propTypes.shape),
  // eslint-disable-next-line react/no-unused-prop-types
  history: propTypes.shape(propTypes.shape)
};

export default SubmitForm;
