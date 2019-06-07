import React, {useState, useEffect, useContext} from 'react';
import propTypes from 'prop-types';

// Storybook Components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";
import MarketingConsent from '@comicrelief/storybook/src/components/MarketingConsent/MarketingConsent';

// fields data
import { defaultFormFields } from './defaultFormFields';

import { marketingConsentData } from './marketingConsentData';

// Util functions
import { mergeInputFieldProps } from '../../../pages/GiftAid/utils/mergeInputFieldProps';

// import context
import FormContext from "../../../context/FormContext";

// Fallback suspense loading
import Loading from "../../Loading";


// Lazy load components
const Form = React.lazy(() => import('../index'));
const FormHeader = React.lazy(() => import('../../FormHeader/FormHeader'));
const FormButton = React.lazy(() => import('../../Buttons/FormButton'));
const InputFields = React.lazy(() => import('../../InputFields/InputFields'));
const JustInTime = React.lazy(() => import('../../JustInTime'));


// let scrollTimeout;

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

    <React.Suspense fallback={ <Loading /> }>

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

    </React.Suspense>

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
