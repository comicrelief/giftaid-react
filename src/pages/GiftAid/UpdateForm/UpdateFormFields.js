import SiteService from '../../../service/Site.service';
const site = new SiteService();
let giftAidButtonChoicesLabel = null;
switch(site.getSite()) {
  case 'BIGNIGHTIN':
    giftAidButtonChoicesLabel = 'Yes, I would like BBC Children in Need and Comic Relief to claim Gift Aid on my donation. *';
  break;
  default:
    giftAidButtonChoicesLabel = 'Yes, I would like Comic Relief to claim Gift Aid on my donation and any donations I make in the future or have made in the past 4 years *';
  break;
};

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
    label: giftAidButtonChoicesLabel,
    additionalText: '&#42; By ticking, I state I am a UK taxpayer making a personal donation and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations, it is my responsibility to pay any difference. Please note that the money that Comic Relief claims back from HMRC as part of the Gift Aid scheme will be treated as unrestricted funds and used to support our general work, even if the original donation was made towards a specific appeal. [Find out more](http://www.comicrelief.com)',
    value: 1,
  },
  {
    label: 'No',
    value: 0,
  },
];



/*
* Default Update Form Fields
*/
export const updateFormFields = {
  
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
  email: {
    id: 'email',
    type: 'email',
    name: 'email',
    required: true,
    label: 'Email address'
  },
  mobile: {
    id: 'mobile',
    type: 'tel',
    name: 'mobile',
    placeholder: 'In the format 07123456789',
    label: 'Mobile number',
    required: false,
    pattern: '^(?:(?:00)?44|0)7(?:[457-9]\\d{2}|624)\\d{6}$', // As per Update.action.js in serverless-giftaid
    helpText: 'Enter the one associated with your donation',
    emptyFieldErrorText: 'Please fill in your mobile number',
    invalidErrorText: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.',
    additionalText: 'Please note: if you donated via SMS, we DO require your number here, in order to match it to this submission.',
  }
};
