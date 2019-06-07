/**
 * Updates validation state
 * @param fieldState Object
 * @param name String
 * @param validation Object
 */
export const setValidity = (fieldState, name, validation) => {

  if (fieldState && name) {

    let newState;
    const prevStateField = validation[name];
    const fieldUndefined = prevStateField === undefined;
    const newValue = fieldUndefined === false && prevStateField.value !== fieldState.value;
    const marketingConsentFieldsChanged = fieldUndefined === false &&
      (fieldState.fieldValidation !== prevStateField.fieldValidation);

    let validationState = {};
    if (fieldUndefined === true || newValue === true || marketingConsentFieldsChanged === true) {
      validationState = {
        ...validation,
        [name]: fieldState,
      };
      newState = {
        ...validationState,
      };
    }
    // make email field optional if present
   /* if (name === 'emailaddress' && fieldState.value === '') {
      validationState = {
        ...validation,
        emailaddress: {
          valid: true,
          value: fieldState.value,
          message: fieldState.message,
          showErrorMessage: false,
        },
      };
    } else {

    }*/
    return {
      newState,
      validationState
    };
  }
};
