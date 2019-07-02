
/*
* Donation Types
*
*/
export const DONATION_TYPES = {
  SMS: 'sms',
  ONLINE: 'online',
  CALL_CENTRE: 'call centre',
};

/*
* Donation Type Radio Button Choices
*
*/
export const donationTypeChoices = [
  { label: 'SMS', value: DONATION_TYPES.SMS },
  { label: 'Online', value: DONATION_TYPES.ONLINE },
  { label: 'Call centre', value: DONATION_TYPES.CALL_CENTRE },
];

/*
* Default GiftAid Button
* Choices
*
*/
export const giftAidButtonChoices = [
  {
    label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation',
    additionalText: '&#42; By ticking I state I am a UK taxpayer making a personal donation and understand' +
      'that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my ' +
      'donations, it is my responsibility to pay any difference. [Find out more](http://www.comicrelief.com)',
    value: 1,
  },
  {
    label: 'No',
    value: 0,
  },
];



/*
* Default Update Form Fields
*
*/
export const defaultFormFields = {

  transactionId: {
    id: 'transactionId',
    type: 'text',
    name: 'transactionId',
    label: 'Transaction ID',
    required: true,
    invalidErrorText: 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter',
    pattern: '^[a-zA-Z0-9-]{5,}$'
  },
  firstName: {
    id: 'firstname',
    type: 'text',
    name: 'firstname',
    label: 'First name',
    required: true,
    invalidErrorText: 'This field only accepts alphabetic characters and \' - ',
    pattern: '^[A-Za-z][A-Za-z\\\'\\-]*$'
  },
  lastName: {
    id: 'lastname',
    type: 'text',
    name: 'lastname',
    label: 'Last name',
    required: true,
    invalidErrorText: 'This field only accepts alphanumeric characters and , . ( ) / & \' - ',
    pattern: '^[A-Za-z0-9]+[ \\- ,.()\\/&\\\'\\w]+$'
  },
  emailAddress: {
    id: 'emailaddress',
    type: 'email',
    name: 'email',
    label: 'Email address',
    required: false,
  }
};
