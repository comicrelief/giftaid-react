import React, {useState, useEffect, useContext} from 'react';
import propTypes from 'prop-types';

// import components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";
import MarketingConsent from '@comicrelief/storybook/src/components/MarketingConsent/MarketingConsent';
import Form from '../../../components/Form/index';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton/index';
import InputFields from '../../../components/InputFields/InputFields';
import JustInTime from '../../../components/JustInTime/index';

// fields data
import { submitFormFields } from './SubmitFormFields';

import { marketingConsentData } from './marketingConsentData';

// Util functions
import { mergeInputFieldProps } from '../utils/Utils';

// import context
import FormContext from "../../../context/FormContext";

import BigNightInCopy from './BigNightInCopy';

// Site config
import SiteService from '../../../service/Site.service';

const site = new SiteService();

function SubmitForm(props) {

  // initialise context
  const {
    refs,
    setFieldValidity,
    currentPostcodePattern,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
    setFieldValidation,
    submitForm,
    isSubmitting
  } = useContext(FormContext); // get states from context

  const { msisdn } = props;

  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState([]); // initialise form inputFieldProps state
  const marketingProps = {};

  // Set additional props for MarketingConsent based on site
  if (site.getSite() === 'BIGNIGHTIN') {
    marketingProps.copy1 = BigNightInCopy.copy1;
    marketingProps.copy2 = BigNightInCopy.copy2;
  }

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Handle set input fields on component mount
    setInputField();
    return () => {
      setInputFieldProps([]); // reset on component unmount
    }
  });

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
    }
    setFieldValidation(fieldValidation);
    // merge input fields with default form fields
    setInputFieldProps(mergeInputFieldProps(submitFormFields, props));
  };

  return (

    <Form className="giftaid__form" >

      <FormHeader page="submit" />

      <InputFields allFields={inputFieldProps} />

      <PostcodeLookup
        ref={refs}
        label="Home address"
        showErrorMessages={formValidityState.showErrorMessages}
        postcodePattern={currentPostcodePattern}
        invalidErrorText="Please enter a valid UK postcode, using a space and capital letters"
        isAddressValid={
          (validation) => {
            Object.keys(validation).map(key => setFieldValidity(validation[key], key));
          }
        }
      />

      <MarketingConsent
        getValidation={(validation) => {
          Object.keys(validation).forEach(key => setFieldValidity(validation[key], key));
        }}
        itemData={marketingConsentData}
        showErrorMessages={formValidityState.showErrorMessages}
        {...marketingProps}
      />

      <FormButton 
        isSubmitting={isSubmitting}
        onClick={(e) => submitForm(e)}
        text="Gift Aid your donation" 
      />

      <JustInTime submit text={justInTimeLinkText} />

    </Form>

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
