
// form validity initial values

// Transaction Id Default Message
const transactionIdErrorMessage = 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter';

export const initialValidity = {
  validating: false,
  formValidity: false,
  showErrorMessages: false,
  formDataError: null,
  formDataSuccess: null,
  urlTransactionId: {
    valid: true,
    errorMessage: transactionIdErrorMessage
  }
};

/**
 * Function to return the default form
 * field validations based on type
 */
export const getFieldValidations = (update = false) => {
  if (update) {
    return defaultUpdateFormFieldValidations;
  }
  return defaultSubmitFormFieldValidations;
};

/*
* Default Submit Form Field
* Validations
*
*/
export const defaultSubmitFormFieldValidations = {
  confirm: {
    valid: false,
    value: undefined,
    message: '',
  },
  mobile: {
    valid: false,
    value: undefined,
    message: '',
  },
  firstname: {
    valid: false,
    value: undefined,
    message: '',
  },
  lastname: {
    valid: false,
    value: undefined,
    message: '',
  },
  postcode: {
    valid: false,
    value: undefined,
    message: '',
  },
  address1: {
    valid: false,
    value: undefined,
    message: '',
  },
  address2: {
    valid: true,
    value: undefined,
    message: '',
  },
  address3: {
    valid: true,
    value: undefined,
    message: '',
  },
  town: {
    valid: false,
    value: undefined,
    message: '',
  },
  country: {
    valid: false,
    value: undefined,
    message: '',
  },
  permissionEmail: {
    isFieldsHidden: false,
    value: null,
    valid: true,
    fieldValidation: {},
  },
  permissionPost: {
    isFieldsHidden: false,
    value: null,
    valid: true,
    fieldValidation: false,
  },
  permissionPhone: {
    isFieldsHidden: false,
    value: null,
    valid: true,
    fieldValidation: false,
  },
  permissionSMS: {
    isFieldsHidden: false,
    value: null,
    valid: true,
    fieldValidation: false,
  },
};


/*
* Default Update Form Field
* Validations
*
*/
export const defaultUpdateFormFieldValidations = {
  firstname: {
    valid: false,
    value: undefined,
    message: '',
  },
  lastname: {
    valid: false,
    value: undefined,
    message: '',
  },
  email: {
    valid: true,
    value: undefined,
    message: '',
  },
  postcode: {
    valid: false,
    value: undefined,
    message: '',
  },
  address1: {
    valid: false,
    value: undefined,
    message: '',
  },
  address2: {
    valid: true,
    value: undefined,
    message: '',
  },
  address3: {
    valid: true,
    value: undefined,
    message: '',
  },
  town: {
    valid: false,
    value: undefined,
    message: '',
  },
  country: {
    valid: false,
    value: undefined,
    message: '',
  },
  giftAidClaimChoice: {
    valid: false,
    value: undefined,
    message: '',
  },
  donationType: {
    valid: false,
    value: undefined,
    message: '',
  },
  transactionId: {
    valid: false,
    value: undefined,
    message: '',
  },
};
