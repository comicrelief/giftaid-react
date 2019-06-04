import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";

import axios from 'axios';

// form components
import UpdateForm from './UpdateForm/index';
import SubmitForm from './SubmitForm/index';

// context
import FormContext from '../../context/FormContext';

// Get util functions and variables
import {
  getRoutes,
  getValidity,
  scrollToError,
  hiddenFields,
  postCodePattern,
  justInTimeLinkText,
} from './utils';

function GiftAid(props) {

  const form = useContext(FormContext);

  // Declare state variables
  const [path, setPath] = useState(props.location.pathname); // initialise path param state
  const [updating, setUpdating] = useState(props.location.pathname !== '/'); // initialise updating param state

  /**
   * GiftAid component mounts
   *
   */
  useEffect(() => {

    return () => {
      // GiftAid component unmounts
      setUpdating(false); // reset updating state
    }
  }, []);

  /**
   * Set path on mount and update
   * if props changes
   */
  useEffect(() => {
    setPath(props.location.pathname)
  }, [props]);

  /**
   * Submits form
   * and redirects to success or sorry page
   * @param formValues
   */
  const submitForm = (formValues) => {

    // Get route variables based on form type
    const routes = getRoutes(path);

    // post form data and settings to endpoint
    axios.post(routes.endpoint, formValues)
      .then(() => {
        form.submitted(true);
        form.setSuccessState({
          firstname: formValues.firstname,
          giftAidChoice: routes.giftAidChoice !== undefined ? routes.giftAidChoice : formValues.confirm,
        });
        props.history.push({
          pathname: routes.successPath,
        });
      })
      .catch(() => {
        props.history.push({
          pathname: routes.sorryPath,
        });
      });
  };

  return (
    <React.Fragment>
      { updating ? (
        <UpdateForm
          submit={(values) => submitForm(values)}
          urlTransID={props.match.params.transaction_id}
          hiddenFields={hiddenFields}
          postCodePattern={postCodePattern}
          scrollToError={(idError) => scrollToError(idError)}
          getValidation={(validation) => getValidity(validation)}
          justInTimeLinkText={justInTimeLinkText}
          title="Update Form"
        />
      ) : (
        <SubmitForm
          submit={(values) => submitForm(values)}
          hiddenFields={hiddenFields}
          scrollToError={() => scrollToError()}
          getValidation={(validation) => getValidity(validation)}
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
