
const transactionIdPattern = '^[a-zA-Z0-9-]{5,}$';

/**
 * Function to validate form
 * @param validation Object
 * @param formValues Object
 * @param formValidity Object
 * @return Object
 */
export const validateForm = (validation, formValues = {}, formValidity = {}) => {

  const donationId = formValues.donationID !== undefined ? formValues.donationID : null;

  // validate donation id if present
  const transIdValidity = donationId !== null ? validateTransactionId(donationId) : null;

  // validate form fields
  const fieldValidity = getValidation(validation);

  let validationState = {
    ...formValidity,
    formValidity: true,
    showErrorMessages: false,
    validating: false,
    urlTransactionId: {
      ...formValidity.urlTransactionId,
      valid: true,
    }
  };
  // Validation fails for fields or transactionId
  if (fieldValidity !== true || (transIdValidity !== true && transIdValidity !== null) ) {

    // set failed fields state
    validationState = {
      ...formValidity,
      formValidity: false,
      showErrorMessages: true,
      validating: true,
    };
    if (transIdValidity !== null && !transIdValidity && donationId !== undefined && donationId !== null) {

      // set transaction id failed state
      validationState.urlTransactionId = {
        ...formValidity.urlTransactionId,
        valid: false,
      }
    }
  }
  return {
    validity: fieldValidity && (transIdValidity === null || transIdValidity),
    validationState,
  };
};

/**
 * Validates transactionId using REGEX pattern
 * @param donationID
 * @returns Boolean
 */
const validateTransactionId = (donationID) => new RegExp(transactionIdPattern).test(donationID);


/**
 * Checks if any field is invalid.
 * If invalid fields: shows error sets state to show errorMessages.
 * If all fields valid: sets form validity to true
 * @param validation Object
 */
const getValidation = (validation) => {
  let validity = true;
  let thisField;

  Object.keys(validation).map((key) => {

    thisField = validation[key];

    console.log(key, thisField);

    /**
      * As we're not passing any 'required' flags to this function, a quick fix to wave our
      * optional email field through, but only if it's valid or empty
      */
    if (thisField.valid !== true && ( key !== 'email' || thisField.showErrorMessage === true )) {
        validity = false;
    }
    return true;
  });

  return validity;
};
