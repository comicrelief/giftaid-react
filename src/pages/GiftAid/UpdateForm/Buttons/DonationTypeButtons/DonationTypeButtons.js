import React, {useEffect, useState} from 'react';
import RadioButtons from "@comicrelief/storybook/src/components/RadioButtons";

const DonationTypeButtons = (props) => {
  const [urlTransID, setUrlTransID] = useState(props.urlTransID);

  useEffect(() => {
    setUrlTransID(props.urlTransID);

    return () => {
      setUrlTransID(undefined);
    }
  }, []);

  if (urlTransID) {
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
          showErrorMessage={props.showErrorMessages}
          ref={props.setRef}
          isValid={(state, id) => { props.setValidity(state, id); }}
        />
      </div>
    );
  }
  return null;
};

export default DonationTypeButtons;
