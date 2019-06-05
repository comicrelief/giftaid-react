import React, { useState, useEffect, useContext } from "react";

import propTypes from "prop-types";
import axios from 'axios';
import browser from "browser-detect";

// form components
import UpdateForm from './UpdateForm/index';
import SubmitForm from './SubmitForm/index';

// context
import AppContext from '../../context/AppContext';

// Get util functions and variables
import { getValidation } from './utils/getValidation';
import { scrollToError } from './utils/scrollToError';

import {
  hiddenFields,
  postCodePattern,
  justInTimeLinkText
} from './utils/giftaidDefaults';



function GiftAid(props) {

  // get props from context
  const app = useContext(AppContext);

  // Declare state variables
  // initialise updating param state
  // set to true if path contains
  // the string update
  const [updating, setUpdating] = useState(props.location.pathname.includes("update"));
  const isBrowser = browser();

  const [supportedAriaAttributes, setSupportedAriaAttributes] = useState(isBrowser.name === 'firefox' && isBrowser.os.match('Windows') ?
    { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' });

  /**
   * GiftAid component mounts
   *
   */
  useEffect(() => {
    return () => {
      // GiftAid component unmounts
      setUpdating(false); // reset updating state
      setSupportedAriaAttributes(null);
    }
  }, []);

  /**
   * Render Url Transaction Id Error
   */
  const renderUrlTransactionIdError = (state) => {
    return (
      <div
        id="field-error--urlTransID"
        className="form__field-error-container form__field-error-container--text"
        {...supportedAriaAttributes}
      >
        { state.valid === false ?
          <span className="url-error">{state.message}</span>
          :
          ''
        }
      </div>
    );
  };

  /**
   * Submits form
   * and redirects to success or sorry page
   * @param formValues
   * @param params
   */
  const submitForm = (formValues, params) => {

    // post form data and settings to endpoint
    axios.post(params.endpoint, formValues)
      .then(() => {

        // set completed state
        app.submitted(true);

        // set success page variables
        app.setSuccessState({
          firstname: formValues.firstname,
          giftAidChoice: params.giftAidChoice,
        });

        // redirect to success page
        props.history.push({
          pathname: params.successPath,
        });
      })
      .catch(() => {
        // redirect to failure page
        props.history.push({
          pathname: params.sorryPath,
        });
      });
  };

  return (
    <React.Fragment>
      { updating ? (
        <UpdateForm
          submit={(formValues, params) => submitForm(formValues, params)}
          urlTransactionId={props.match.params.transaction_id}
          renderUrlTransactionIdError={(state) => renderUrlTransactionIdError(state)}
          hiddenFields={hiddenFields}
          postCodePattern={postCodePattern}
          scrollToError={(idErrorState) => scrollToError(idErrorState)}
          getValidation={(validation) => getValidation(validation)}
          justInTimeLinkText={justInTimeLinkText}
          title="Update Form"
        />
      ) : (
        <SubmitForm
          submit={(formValues, params) => submitForm(formValues, params)}
          hiddenFields={hiddenFields}
          scrollToError={() => scrollToError()}
          getValidation={(validation) => getValidation(validation)}
          postCodePattern={postCodePattern}
          justInTimeLinkText={justInTimeLinkText}
          title="Submit Form"
        />
      )}
    </React.Fragment>
  );
}

GiftAid.defaultProps = {
  inputFieldOverrides: {},
  history: { push: { } },
};
GiftAid.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
};

export default GiftAid;
