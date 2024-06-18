import React, { useState, useEffect, useContext } from 'react';

// import components
import PostcodeLookup from "@comicrelief/storybook/src/components/PostcodeLookup";
import Form from '../../../components/Form/index';
import FormHeader from '../../../components/FormHeader/FormHeader';
import FormButton from '../../../components/Buttons/FormButton/index';
import DonationTypeButtons from '../../../components/Buttons/DonationTypeButtons/DonationTypeButtons';
import GiftAidClaimChoiceButtons from '../../../components/Buttons/GiftAidClaimChoiceButtons/GiftAidClaimChoiceButtons';
import InputFields from '../../../components/InputFields/InputFields';
import JustInTime from '../../../components/JustInTime/index';

// fields data
import { updateFormFields, donationTypeChoices, giftAidButtonChoices } from './UpdateFormFields';

// import context
import FormContext from '../../../context/FormContext';


function UpdateForm(props) {

  // initialise context
  const {
    refs,
    setFieldValidity,
    justInTimeLinkText,
    formValidityState,
    fieldValidation,
    setFieldValidation,
    submitForm,
  } = useContext(FormContext); // get props from context


  // Declare state variables
  const [inputFieldProps, setInputFieldProps] = useState(updateFormFields); // initialise form inputFieldProps state

  /**
   * Component mounts and updates
   */
  useEffect(() => {
    setFieldValidation(fieldValidation);
    // Reset states on component unmount
    delete fieldValidation.donationType;
    return () => {
      setInputFieldProps([]);
    }
  }, []);

  return (

    <Form className="giftaid__form update-giftaid__form">

      <FormHeader page="update" />

      <div className="form-fields--wrapper">

        {/* TO-DO: ARE WE KEEPING THIS IN? */}

        {/* <DonationTypeButtons donationTypeChoices={donationTypeChoices} /> */}

        <h3 className="form--update__title form--update__title--giftaid text-align-centre">
          Who is changing their declaration?
        </h3>

        <InputFields allFields={inputFieldProps} />

        <PostcodeLookup
          ref={refs}
          label="Home address"
          showErrorMessages={formValidityState.showErrorMessages}
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
