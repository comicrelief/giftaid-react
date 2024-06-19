import SiteService from "../../../service/Site.service";
import TagManager from 'react-gtm-module';

const site = new SiteService();
const url = site.getCurrentUrl();
const campaign = site.get('campaign').name;
const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;

/**
 * Function to Scroll to and focus on field(s) with error
 * @param state Object
 */
export const scrollToError = (state = {}) => {
  // Scroll to the first erroring field and focus on its input field
  const errorWrapper = document.querySelectorAll('.form__field--erroring')[0];
  if (errorWrapper) {
    errorWrapper.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.querySelectorAll('.form__field--erroring > div input')[0].focus();
    }, 500);
  }
};

/**
 * Merge default input field properties with overrides.
 * @param defaultInputFieldsProps
 * @param props
 * @returns {object}
 */
export const mergeInputFieldProps = (defaultInputFieldsProps, props) => {
  const inputFields = defaultInputFieldsProps;
  const overrides = props.inputFieldOverrides;
  Object.entries(overrides).forEach(([key]) => {
    Object.assign(inputFields[key], overrides[key]);
  });

  return inputFields;
};


/**
 * Create endpoint params for form submission
 * based on form type
 * @param update
 */
export const getPathParams = (update = false) => {
  return {
    endpoint: typeof update !== 'undefined' && update ? ENDPOINT_URL + 'update' : ENDPOINT_URL,
    successPath: typeof update !== 'undefined' && update ? '/update/success' : '/success',
    sorryPath: typeof update !== 'undefined' && update ? '/update/sorry' : '/sorry',
  };
};


/**
 * Function to Create form fields
 * for submission to endpoint
 * @param validation Object - form fields
 * @param urlId String - url Transaction Id
 * @param update Boolean - Form type
 */
export const getFormValues = (validation, update = false) => {
  // create field values
  const fieldValues = {};

  Object.keys(validation).map((key) => {
    let value = validation[key].value;
    // Set Giftaid choice for submit form
    if (key === 'confirm') {
      value = validation[key].value === true ? 1 : 0;
    }
    // set Giftaid choice for update form
    if (key === 'giftAidClaimChoice') {
      fieldValues.confirm = parseInt(value); // reassign to confirm field
    }

    // set values for marketing consent checkboxes and fields
    if (/^permission/.test(key) && value !== null) {
      if (validation[key].fieldValidation !== false) {
        const fields = validation[key].fieldValidation;
        Object.keys(fields).forEach(name => fieldValues[name] = fields[name].value);
      }
      value = value === 'no' ? 0 : 1;
    }
    return fieldValues[key] = value;
  });

  // Create donation type field for Update Form
  fieldValues.donationType = typeof validation.donationType !== 'undefined'
    && validation.donationType
    ? validation.donationType.value : DONATION_TYPES.ONLINE;

  // Create name based on Form type
  const name = update ? 'GiftAidUpdate' : 'GiftAid';

  // remove giftaid claim field if it exists
  if (fieldValues.giftAidClaimChoice !== undefined) {

    // Delete giftAidClaimChoice form field
    delete fieldValues.giftAidClaimChoice;
  }

  return Object.assign({}, {
    campaign: campaign,
    transSource: `${campaign}_${name}`,
    transSourceUrl: url,
    transType: name,
    timestamp: site.getTimestamp(),
  }, fieldValues);
};


/*
* Donation Types
*
*/
const DONATION_TYPES = {
  SMS: 'sms',
  ONLINE: 'online',
  CALL_CENTRE: 'call centre',
};

/*
* Common form variables
*
*/
export const hiddenFields = ['field-input--address1', 'field-input--town', 'field-wrapper--country'];

/*
* Just In Time Link Text
*
*/
export const justInTimeLinkText = 'Why do we collect this info?';

/**
 * Function to validate form
 * @param validation Object
 * @param formValues Object
 * @param formValidity Object
 * @return Object
 */
export const validateForm = (validation, formValues = {}, formValidity = {}) => {

  // validate form fields
  const fieldValidity = getValidation(validation);

  let validationState = {
    ...formValidity,
    formValidity: true,
    showErrorMessages: false,
    validating: false,
  };

  // Validation fails for fields
  if (fieldValidity !== true) {

    // set failed fields state
    validationState = {
      ...formValidity,
      formValidity: false,
      showErrorMessages: true,
      validating: true,
    };
  }
  const email = formValues.email && formValues.email !== "" ? formValues.email : 'N';

  TagManager.dataLayer({
    dataLayer: {
      user: {
        userEmail: email,
      },
      event: 'custUserEmail',
    },
  });
  return {
    validity: fieldValidity,
    validationState,
  };
};

/**
 * Checks if any field is invalid.
 * If invalid fields: shows error sets state to show errorMessages.
 * If all fields valid: sets form validity to true
 * @param validation Object
 */
const getValidation = (validation) => {
  let validity = true;
  let thisField;

  for (const [key] of Object.entries(validation)) {
    thisField = validation[key];

    if (thisField.valid !== true || thisField.showErrorMessage === true) {
      validity = false;
    }
  };

  return validity;
};


// form validity initial values
export const initialFormValidity = {
  validating: false,
  formValidity: false,
  showErrorMessages: false,
  formDataError: null,
  formDataSuccess: null,
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
    valid: true,
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
  // permissionPost: {
  //   isFieldsHidden: false,
  //   value: null,
  //   valid: true,
  //   fieldValidation: false,
  // },
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
  mobile: {
    valid: true,
    value: undefined,
    message: '',
  },
};


export const getRoute = (route) => {
  return `${process.env.REACT_APP_ENDPOINT_URL}${route}`;
};
