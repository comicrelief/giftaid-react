
/**
 * Checks if any field is invalid.
 * If invalid fields: shows error sets state to show errorMessages.
 * If all fields valid: sets form validity to true
 * @param validation Object
 */
export const getValidation = (validation) => {
  let validity = true;
  Object.keys(validation).map((key) => {
    if (validation[key].valid !== true) {
      validity = false;
    }
    return true;
  });
  return validity;
};

