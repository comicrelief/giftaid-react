import React from 'react';
import RadioButtons from "@comicrelief/storybook/src/components/RadioButtons";

const GiftAidClaimChoiceButtons = (props) => {
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
        showErrorMessage={props.showErrorMessages}
        ref={props.setRef}
        isValid={(state, id) => { props.setValidity(state, id); }}
      />
    </div>
  );
};

export default GiftAidClaimChoiceButtons;
