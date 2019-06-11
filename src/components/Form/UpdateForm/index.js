import React, { useState, useEffect, useContext } from 'react';

// import components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";
import Form from '../index';
import FormHeader from '../../FormHeader/FormHeader';
import FormButton from '../../Buttons/FormButton';
import DonationTypeButtons from '../../Buttons/DonationTypeButtons/DonationTypeButtons';
import GiftAidClaimChoiceButtons from '../../Buttons/GiftAidClaimChoiceButtons/GiftAidClaimChoiceButtons';
import InputFields from '../../InputFields/InputFields';
import JustInTime from '../../JustInTime';
import UrlTransactionIdError from './UrlTransactionIdError';


// fields data
import { defaultFormFields, donationTypeChoices, giftAidButtonChoices } from './defaultFormFields';

// import context
import FormContext from '../../../context/FormContext';


function UpdateForm(props) {

  // initialise context
  const {
    urlTransactionId,
    formValidityState,
    refs,
    postCodePattern,
    justInTimeLinkText,
    setFieldValidity,
    fieldValidation,
    setFieldValidation,
    submitForm,
  } = useContext(FormContext); // get props from context

  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState(defaultFormFields); // initialise form inputFieldProps state

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    // Delete if url trans Id if present
    // on component mount or update
    if (urlTransactionId !== undefined) {
      // Delete transactionId form field
      delete inputFieldProps.transactionId;
      delete fieldValidation.transactionId;
    } else {
      // Else, delete the donation type radiobuttons
      delete fieldValidation.donationType;
    }
    setFieldValidation(fieldValidation);

    // Reset states on component unmount
    return () => {
      setInputFieldProps([]);
    }
  }, []);

  return (

    <Form className="giftaid__form update-giftaid__form">

      <FormHeader page="update" />

      <UrlTransactionIdError />

      <div className="form-fields--wrapper">

        <DonationTypeButtons donationTypeChoices={donationTypeChoices} />

        <h3
          className="form--update__title form--update__title--giftaid text-align-centre">
          Who is changing their declaration?
        </h3>

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

      </div>

      <GiftAidClaimChoiceButtons giftAidButtonChoices={giftAidButtonChoices} />

      <FormButton onClick={e => submitForm(e)} text="Update Declaration" />

      <JustInTime text={justInTimeLinkText} />

    </Form>
  );
}

export default UpdateForm;
