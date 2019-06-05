import React from 'react';
import RadioButtons from "@comicrelief/storybook/src/components/RadioButtons";
import FormContext from "../../../context/FormContext";

const GiftAidClaimChoiceButtons = (props) => {

  // initialise form context
  const formContext = React.useContext(FormContext);


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
        showErrorMessage={formContext.showErrorMessages}
        ref={formContext.setRef}
        isValid={(state, id) => { formContext.setValidity(state, id); }}
      />
    </div>
  );
};

export default GiftAidClaimChoiceButtons;
