/**
 * Function to Scroll to and focus on field(s) with error
 * @param state Object
 */
export const scrollToError = (state = {}) => {

  // Scroll to transactionId field / url parameter error message
  // if present
  if (state.urlTransactionId.valid === false) {
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
