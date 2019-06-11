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
import { defaultFormFields } from './defaultFormFields';

import { marketingConsentData } from './marketingConsentData';

// Util functions
import { mergeInputFieldProps } from '../utils/mergeInputFieldProps';

// import context
import FormContext from "../../../context/FormContext";


function SubmitForm(props) {

  // initialise context
  const {
    formValidityState,
    refs,
    postCodePattern,
    justInTimeLinkText,
    setFieldValidity,
    submitForm,
  } = useContext(FormContext); // get states from context

  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState([]); // initialise form inputFieldProps state

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Handle set input fields on component mount
    setInputField();
    return () => {
      setInputFieldProps([]); // reset on component unmount
    }
  },[]);

  /**
   * Handle set input fields
   */
  const setInputField = () => {
    // merge input fields with default form fields
    setInputFieldProps(mergeInputFieldProps(defaultFormFields, props));
  };


  return (

    <Form className="giftaid__form" >

      <FormHeader page="submit" />

      <InputFields allFields={inputFieldProps} />

      <PostcodeLookup
        ref={refs}
        label="Postal address"
        showErrorMessages={formValidityState.showErrorMessages}
        pattern={postCodePattern}
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
      />

      <FormButton onClick={(e) => submitForm(e)} text="Gift Aid your donation" />

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
