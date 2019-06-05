import React, { useState, useEffect } from 'react';

// Components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";

import Form from '../../../components/Form';
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormButton from "../../../components/Buttons/FormButton";

import DonationTypeButtons from '../../../components/Buttons/DonationTypeButtons/DonationTypeButtons';
import GiftAidClaimChoiceButtons from '../../../components/Buttons/GiftAidClaimChoiceButtons/GiftAidClaimChoiceButtons';
import JustInTime from '../../../components/JustInTime';
import InputFields from '../../../components/InputFields/InputFields';

// fields data
import {
  donationTypeChoices,
  giftAidButtonChoices,
  defaultFormFields,
  defaultUpdateFormFieldValidations,
  transactionIdErrorMessage,
  transactionIdPattern as transIdPattern,
} from './defaultFormFields';

// Get util functions
import { getPathParams } from '../utils/getPathParams';

// Function to get form values
import { getFormValues } from '../utils/getFormValues';

//Context provider
import { FormProvider } from '../../../context/FormContext';

// initialise scroll time out
let scrollTimeout;

function UpdateForm(props) {

  // Declare state variables
  const [validation, setValidation] = useState(defaultUpdateFormFieldValidations); // initialise form fields validation state

  const [inputFieldProps, setInputFieldProps] = useState(defaultFormFields); // initialise form inputFieldProps state

  const [validating, setValidating] = useState(false); // initialise form validating state
  const [formValidity, setFormValidity] = useState(false); // initialise form validity state
  const [showErrorMessages, setShowErrorMessages] = useState(false); // initialise form error message state
  const [formDataError, setFormDataError] = useState(null); // initialise form data error state
  const [formDataSuccess, setFormDataSuccess] = useState(null); // initialise form data success state

  const [urlTransactionId, setUrlTransactionId] = useState(props.urlTransactionId); // initialise with url Trans ID value from parent

  const [urlIdValidity, setUrlIdValidity] = useState({ valid: true, message: transactionIdErrorMessage}); // initialise urlTransactionIdError state

  const [refs, setRefs] = useState(null); // initialise form fields refs state


  /**
   * Component mounts and updates
   */
  useEffect(() => {

    // Set url Transaction ID value from parent
    // on mount and update
    setUrlTransactionId(props.urlTransactionId);
    // Reset states on component unmount
    return () => {
      setFormDataError(null);
      setFormDataSuccess(null);
      setUrlTransactionId(undefined);
      setRefs(undefined);
      setInputFieldProps(null)
    }
  }, []);

  /**
   * Delete if url param is present
   * on component mount or update
   */
  useEffect(() => {

    // Url trans Id is present
    if (urlTransactionId !== undefined) {
      // Delete transactionId form field
      delete inputFieldProps.transactionId;
      delete validation.transactionId;
    } else {
      // Else, delete the donation type radiobuttons
      delete validation.donationType;
    }
    // setInputFieldProps(validation);
  }, []);

  /**
   * Handle scroll to error on
   * component update
   */
  useEffect(() => {
    if ((showErrorMessages && !formValidity && validating) || urlIdValidity.valid === false ) {
      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { scrollToError(); }, 500);
    }
  });


  /**
   * Scrolls to and focuses on field with error
   */
  const scrollToError = () => {
    setValidating(false);
    props.scrollToError(urlIdValidity.valid === false);
    clearTimeout(scrollTimeout);
  };

  /**
   * Updates validation state
   * @param childState
   * @param name
   */
  const setValidity = (childState, name) => {
    if (validation[name] &&
      (validation[name].value === undefined ||
        validation[name].value !== childState.value)) {
      // make email field optional
      if (name === 'emailaddress' && childState.value === '') {
        setValidation({
          ...validation,
          emailaddress: {
            valid: true,
            value: childState.value,
            message: childState.message,
            showErrorMessage: false,
          },
        });
      } else {
        let newState;
        if (validation[name] !== undefined &&
          // AND that object is empty OR the saved value isnt the same as our new childstate value
          (validation[name].value === undefined ||
            validation[name].value !== childState.value)) {
          setValidation({...validation, [name]: childState});
          newState = {
            ...validation,
          };
        }
        return newState;
      }
    }
  };


  /**
   * Validates transactionId url parameter value.
   * If urlTransactionIdError is already set,
   * resets all validity states.
   * @param donationID
   * @returns Boolean
   */
  const validateTransactionId = (donationID) => {
    const transactionIdPattern = new RegExp(transIdPattern);
    return transactionIdPattern.test(donationID);
  };

  /**
   * Validates and submits form.
   * @param e
   */
  const validateForm = (e) => {
    e.preventDefault();

    const formValues = getFormValues(validation, urlTransactionId, true);

    // validate transactionId
    const transIdValidity = validateTransactionId(formValues.donationID);

    const validity = props.getValidation(validation);

    if (validity !== true || !transIdValidity) {
      // update states accordingly
      setFormValidity(false);
      setShowErrorMessages(true);
      setValidating(true);
      if (!transIdValidity && urlTransactionId !== undefined) {
        // set state for url id validity
        setUrlIdValidity({...urlIdValidity, valid: false });
      }
    } else {
      // update states accordingly
      setFormValidity(true);
      setShowErrorMessages(false);
      setValidating(false);

      // set state for url id validity
      setUrlIdValidity({...urlIdValidity, valid: true });

      // Get submit params
      const params = getPathParams(true, formValues.confirm);

      //Submits form to endpoint
      props.submit(formValues, params);
    }
  };

  const childProps = {
    urlTransactionId: urlTransactionId,
    showErrorMessages: showErrorMessages,
    formDataSuccess: formDataSuccess,
    formDataError: formDataError,
    refs: refs,
    setValidity: setValidity,
  };

  return (
    <FormProvider value={childProps}>
      <Form
        className="update-giftaid__form"
      >

        <FormHeader
          page="update"
        />
        { props.renderUrlTransactionIdError(urlIdValidity)}

        <div className="form-fields--wrapper">

          <DonationTypeButtons
            donationTypeChoices={donationTypeChoices}
          />

          <h3 className="form--update__title form--update__title--giftaid text-align-centre">
            Who is changing their declaration?
          </h3>

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
        </div>
        <GiftAidClaimChoiceButtons
          giftAidButtonChoices={giftAidButtonChoices}
        />
        <FormButton
          onClick={e => validateForm(e)}
          text="Update Declaration"
        />

        <JustInTime
          text={props.justInTimeLinkText}
        />
      </Form>
    </FormProvider>
  );
}

export default UpdateForm;
