import SiteService from '../../../service/Site.service';

const site = new SiteService();
let label = null;
switch (site.getSite()) {
  case 'BIGNIGHTIN':
    label = 'Yes, I would like BBC Children in Need and Comic Relief to claim Gift Aid on my donation. *';
    break;
  default:
    label = 'Yes, I would like Comic Relief to claim Gift Aid on my donation and any donations I make in the future or have made in the past 4 years *';
    break;
}

/*
* Default Submit Form Fields
*
*/
export const submitFormFields = {

  giftaidCheck: {
    id: 'giftaid',
    type: 'checkbox',
    name: 'confirm',
    label,
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
