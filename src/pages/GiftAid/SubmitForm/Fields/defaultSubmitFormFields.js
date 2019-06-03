
/*
* Default Submit Form Fields
*
*/
export const defaultSubmitFormFields = {

  giftaidCheck: {
    id: 'giftaid',
    type: 'checkbox',
    name: 'confirm',
    label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation *',
    required: true,
    emptyFieldErrorText: 'To Gift Aid your donation you need to tick the checkbox',
    additionalText: '* By ticking I state I am a UK taxpayer making a personal donation and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations, it is my responsibility to pay any difference. <a href=\'https://www.comicrelief.com/frequently-asked-questions\' class=\'link inline\' target=\'_blank\' rel=\'noreferrer\'>Find out more</a>'
  },
  phoneNumber: {
    id: 'mobile',
    type: 'tel',
    name: 'mobile',
    placeholder: 'In the format 07123456789',
    label: 'Mobile number',
    required: true,
    pattern: '^07[0-9]{9}$',
    helpText: 'Enter the one you used for your text donation',
    emptyFieldErrorText: 'Please fill in your mobile number',
    invalidErrorText: 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.'
  },
  firstName: {
    id: 'firstname',
    type: 'text',
    name: 'firstname',
    label: 'First name',
    required: true,
    invalidErrorText: 'This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters',
    pattern: '^[A-Za-z][A-Za-z\'-]{0,24}$'
  },
  lastName: {
    id: 'lastname',
    type: 'text',
    name: 'lastname',
    label: 'Last name',
    required: true,
    invalidErrorText: 'This field only accepts 25 alphanumeric characters and , . ( ) / & \' - starting with alphanumeric characters',
    pattern: '^[a-zA-Z0-9][a-zA-Z0-9\'.,/()& -]{0,24}$'
  }
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
* Marketing Consent Data
* For Submit Form
*
*/
export const marketingConsentData = {
  Questions: [
    {
      id: 'permissionEmail',
      text: 'Email',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionEmail',
          hideFields: false
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionEmail',
          hideFields: true
        }
      ],
      field: [
        {
          id: 'emailAddress',
          type: 'email',
          name: 'email',
          label: 'Email address',
          placeholder: 'example@email.com',
          required: true,
        }
      ]
    },
    {
      id: 'permissionPost',
      text: 'Post',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPost'
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionPost'
        }
      ]
    },
    {
      id: 'permissionPhone',
      text: 'Phone',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPhone'
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionPhone'
        }
      ]
    },
    {
      id: 'permissionSMS',
      text: 'SMS',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionSMS'
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionSMS'
        }
      ]
    }
  ]
};

export default {
  defaultSubmitFormFields,
  defaultSubmitFormFieldValidations,
  marketingConsentData
}
