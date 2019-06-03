
const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;

/**
 * Get route variables based on form type
 * @param path
 */
export const getRoutes = (path) => {
  const params = {
    endpoint: ENDPOINT_URL,
    successPath: '/success',
    giftAidChoice: null,
    sorryPath: '/sorry',
  };
  if (path !== '/') {
    params.endpoint = ENDPOINT_URL + 'update';
    params.successPath = '/update/success';
    params.giftAidChoice = undefined;
    params.sorryPath = '/update/sorry';
  }
  return params;
};

/**
 * Checks if any field is invalid.
 * If invalid fields: shows error sets state to show errorMessages.
 * If all fields valid: sets form validity to true
 * @param validation
 */
export const getValidity = (validation) => {
  let validity = true;
  Object.keys(validation).map((key) => {
    if (validation[key].valid !== true) {
      validity = false;
    }
    return true;
  });
  return validity;
};


/**
 * Scrolls to and focuses on field with error
 */
export const scrollToError = (idError = null) => {
  // Scroll to transactionId field / url parameter error message
  if (idError) {
    document.querySelector('#field-error--urlTransID').scrollIntoView('smooth');
  }

  // Scroll to the first erroring field and focus on its input field
  const errorWrapper = document.querySelectorAll('.form__field--erroring')[0];
  const errorField = document.querySelectorAll('.form__field--erroring > div input')[0];

  if (errorWrapper !== undefined) {
    errorWrapper.scrollIntoView('smooth');
    errorField.focus();
  }
};

/*
* Submit and Update Forms
* Hidden fields
*
*/
export const hiddenFields = ['field-input--address1', 'field-input--town', 'field-wrapper--country'];

/*
* REGEX for postcode field
*
*/
export const postCodePattern = '[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}';

/*
* Just In Time Link Text
*
*/
export const justInTimeLinkText = 'Why do we collect this info?';

export default {
  getRoutes,
  getValidity,
  scrollToError,
  hiddenFields,
  postCodePattern,
  justInTimeLinkText,
}
