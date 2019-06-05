import React, {useEffect, useState} from 'react';
import RadioButtons from "@comicrelief/storybook/src/components/RadioButtons";
import FormContext from "../../../context/FormContext";

const DonationTypeButtons = (props) => {

  // initialise form context
  const formContext = React.useContext(FormContext);

  const [urlTransactionId, setUrlTransactionId] = useState(formContext.urlTransactionId);

  useEffect(() => {
    setUrlTransactionId(formContext.urlTransactionId);

    return () => {
      setUrlTransactionId(undefined);
    }
  }, []);

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
          showErrorMessage={formContext.showErrorMessages}
          ref={props.setRef}
          isValid={(state, id) => { formContext.setValidity(state, id); }}
        />
      </div>
    );
  }
  return null;
};

export default DonationTypeButtons;
