
/**
 * Function to Scroll to and focus on field(s) with error
 * @param urlTransIDError Boolean
 */
export const scrollToError = (urlTransIDError = false) => {

  // Scroll to transactionId field / url parameter error message
  if (urlTransIDError) {
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
