import React, { useState, useEffect } from 'react';

// Components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";

import FormHeader from "../../../components/FormHeader/FormHeader";
import TransactionIdError from './TransactionIdError/TransactionIdError';
import DonationTypeButtons from './Buttons/DonationTypeButtons/DonationTypeButtons';
import GiftAidClaimChoiceButtons from './Buttons/GiftAidClaimChoiceButtons/GiftAidClaimChoiceButtons';
import JustInTime from '../JustInTime';
import InputFields from '../InputFields/InputFields';

// fields data
import {
  donationTypeChoices,
  giftAidButtonChoices,
  defaultUpdateFormFields,
  defaultUpdateFormFieldValidations,
  transactionIdErrorMessage,
  transactionIdPattern as transIdPattern,
} from './Fields/defaultUpdateFormFields';

// Function to get form values
import { getFormValues } from './utils/getFormValues';

// initialise scroll time out
let scrollTimeout;

function UpdateForm(props) {

  // Declare state variables
  const [validation, setValidation] = useState(defaultUpdateFormFieldValidations); // initialise form fields validation state

  const [validating, setValidating] = useState(false); // initialise form validating state
  const [formValidity, setFormValidity] = useState(false); // initialise form validity state
  const [showErrorMessages, setShowErrorMessages] = useState(false); // initialise form error message state
  const [formDataError, setFormDataError] = useState(null); // initialise form data error state
  const [formDataSuccess, setFormDataSuccess] = useState(null); // initialise form data success state
  const [urlTransactionIdError, setUrlTransactionIdError] = useState(false); // initialise urlTransactionIdError state
  const [urlTransID, setUrlTransID] = useState(props.urlTransID); // initialise url Trans ID value from parent

  const [refs, setRefs] = useState(null); // initialise form fields refs state


  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Set url Trans ID value from parent
    // on mount and update
    setUrlTransID(props.urlTransID);
    // Reset states on component unmount
    return () => {
      setFormDataError(null);
      setFormDataSuccess(null);
      setUrlTransID(undefined);
      setRefs(undefined);
    }
  }, []);

  /**
   * Delete if url param is present
   * on component mount or update
   */
  useEffect(() => {
    // Url trans Id is present
    if (urlTransID !== undefined) {
      // Delete transactionId form field
      delete validation.transactionId;
    } else {
      // Else, delete the donation type radiobuttons
      delete validation.donationType;
    }
  }, []);

  /**
   * Handle scroll to error on
   * component update
   */
  useEffect(() => {
    if ((showErrorMessages && !formValidity && validating) || urlTransactionIdError) {
      // timeout needed for error class names to appear
      scrollTimeout = setTimeout(() => { scrollToError(); }, 500);
    }
  });


  /**
   * Scrolls to and focuses on field with error
   */
  const scrollToError = () => {
    setValidating(false);
    props.scrollToError(urlTransactionIdError);
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

    const formValues = getFormValues(validation, urlTransID);

    // validate transactionId
    const transIdValidity = validateTransactionId(formValues.donationID);

    const validity = props.getValidation(validation);

    // update state accordingly
    if (validity !== true || !transIdValidity) {
      setFormValidity(false);
      setShowErrorMessages(true);
      setValidating(true);
      if (!transIdValidity && urlTransID !== undefined) {
        setUrlTransactionIdError(true);
      }
    } else {
      setFormValidity(true);
      setShowErrorMessages(false);
      setValidating(false);
      setUrlTransactionIdError(false);
      props.submit(formValues);
    }
  };

  return (
    <main role="main">
      <section>
        <form
          id="form"
          noValidate
          className="update-giftaid__form"
          data-success={formDataSuccess}
          data-error={formDataError}
        >
          <FormHeader
            page="update"
            urlTransID={urlTransID}
          />
          <TransactionIdError
            urlTransactionIdError={urlTransactionIdError}
            transactionIdErrorMessage={transactionIdErrorMessage}
          />

          <div className="form-fields--wrapper">

            <DonationTypeButtons
              donationTypeChoices={donationTypeChoices}
              showErrorMessages={showErrorMessages}
              setRef={refs}
              urlTransID={urlTransID}
              setValidity={setValidity}
            />

            <h3 className="form--update__title form--update__title--giftaid text-align-centre">
              Who is changing their declaration?
            </h3>

            <InputFields
              setRef={refs}
              urlTransID={urlTransID}
              allFields={defaultUpdateFormFields}
              setValidity={setValidity}
              showErrorMessages={showErrorMessages}
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
            showErrorMessages={showErrorMessages}
            setRef={refs}
            setValidity={setValidity}
          />
          <button
            type="submit"
            className="btn btn--red"
            onClick={e => validateForm(e)}
          >Update Declaration
          </button>
          <JustInTime
            justInTimeLinkText={props.justInTimeLinkText}
          />
        </form>
      </section>
    </main>
  );
}

export default UpdateForm;
