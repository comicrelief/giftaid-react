import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

import axios from 'axios';

import UpdateForm from './UpdateForm/index';
import SubmitForm from './SubmitForm/index';

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

  // Declare state variables
  const [path, setPath] = useState(props.location.pathname); // initialise path param state
  const [updating, setUpdating] = useState(props.location.pathname !== '/'); // initialise updating param state

  /**
   * GiftAid component mounts
   *
   */
  useEffect(() => {
    props.submitted(false);  // reset submitted state

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
        props.submitted(true);
        props.history.push({
          pathname: routes.successPath,
          state: {
            firstname: formValues.firstname,
            giftAidChoice: routes.giftAidChoice !== undefined ? routes.giftAidChoice : formValues.confirm,
          },
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
