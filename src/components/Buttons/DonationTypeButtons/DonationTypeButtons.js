import React, { useContext } from 'react';
import RadioButtons from "@comicrelief/storybook/src/components/RadioButtons";

import FormContext from "../../../context/FormContext";

const DonationTypeButtons = (props) => {

  // initialise context
  const {
    urlTransactionId,
    formValidityState,
    refs,
    setFieldValidity,
  } = useContext(FormContext); // get props from context

  if (urlTransactionId) {
    return (
      <div>
        <h3 className="form--update__title form--update__title--donation text-align-centre">
          How did you make the donation?
        </h3>

        <RadioButtons
          id="donationType"
          name="donationType"
          label="How did you make your donation?"
          required
          options={props.donationTypeChoices}
          showErrorMessage={formValidityState.showErrorMessages}
          ref={refs}
          isValid={(state, id) => { setFieldValidity(state, id); }}
        />
      </div>
    );
  }
  return null;
};

export default DonationTypeButtons;
