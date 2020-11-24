import React, { useContext } from 'react';
import RadioButtons from '@comicrelief/storybook/src/components/RadioButtons';

import FormContext from '../../../context/FormContext';

const GiftAidClaimChoiceButtons = props => {
  // initialise context
  const {
    formValidityState,
    setFieldValidity,
    refs
  } = useContext(FormContext); // get props from context

  return (
    <div>
      <h3 className="form--update__title text-align-centre">
        Your Gift Aid declaration
      </h3>

      <RadioButtons
        id="giftAidClaimChoice"
        name="giftAidClaimChoice"
        label="Can we claim Gift Aid on your donation?"
        required
        options={props.giftAidButtonChoices}
        showErrorMessage={formValidityState.showErrorMessages}
        ref={refs}
        isValid={(state, id) => setFieldValidity(state, id)}
      />
    </div>
  );
};

export default GiftAidClaimChoiceButtons;
