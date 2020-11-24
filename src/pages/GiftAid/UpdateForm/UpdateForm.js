import React, { useState, useEffect, useContext } from 'react';

// import components
import PostcodeLookup from '@comicrelief/storybook/src/components/PostcodeLookup';
import Form from '../../../components/Form/index';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton/index';
import DonationTypeButtons from '../../../components/Buttons/DonationTypeButtons/DonationTypeButtons';
import GiftAidClaimChoiceButtons from '../../../components/Buttons/GiftAidClaimChoiceButtons/GiftAidClaimChoiceButtons';
import InputFields from '../../../components/InputFields/InputFields';
import JustInTime from '../../../components/JustInTime/index';
import UrlTransactionIdError from './UrlTransactionIdError';

// fields data
import { updateFormFields, donationTypeChoices, giftAidButtonChoices } from './UpdateFormFields';

// import context
import FormContext from '../../../context/FormContext';

function UpdateForm(props) {
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
  } = useContext(FormContext); // get props from context

  const { urlTransactionId } = props;

  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState(updateFormFields); // initialise form inputFieldProps state

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
    };
  }, []);

  return (

    <Form className="giftaid__form update-giftaid__form">

      <FormHeader page="update" />

      <UrlTransactionIdError />

      <div className="form-fields--wrapper">

        <DonationTypeButtons donationTypeChoices={donationTypeChoices} />

        <h3
          className="form--update__title form--update__title--giftaid text-align-centre"
        >
          Who is changing their declaration?
        </h3>

        <InputFields allFields={inputFieldProps} />

        <PostcodeLookup
          ref={refs}
          label="Postal address"
          showErrorMessages={formValidityState.showErrorMessages}
          pattern={postCodePattern}
          isAddressValid={
            validation => {
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
