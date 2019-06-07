import SiteService from "../../../service/Site.service";

const site = new SiteService();
const url = site.getCurrentUrl();
const campaign = site.get('campaign').name;

/**
 * Function to Create form fields
 * for submission to endpoint
 * @param validation Object - form fields
 * @param urlId String - url Transaction Id
 * @param update Boolean - Form type
 */

export const getFormValues = (validation, urlId = null, update = false) => {

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
      fieldValues.confirm = value; // reassign to confirm field
    }

    // set values for marketing consent checkboxes and fields
    if (/^permission/.test(key) && value !== null) {
      if (value === 'yes' && validation[key].fieldValidation !== false) {
        const fields = validation[key].fieldValidation;
        Object.keys(fields).forEach(name => fieldValues[name] = fields[name].value);
      }
      value = value === 'no' ? 0 : 1;
    }
    return fieldValues[key] = value;
  });

  // Create a Donation id field for Update Form
  if ((typeof validation.transactionId !== 'undefined' && validation.transactionId) || urlId !== null) {

    fieldValues.donationID = typeof validation.transactionId !== 'undefined'
    && validation.transactionId
      ? validation.transactionId.value : urlId;
  }

  // Create donation type field for Update Form
  fieldValues.donationType = typeof validation.donationType !== 'undefined'
  && validation.donationType
    ? validation.donationType.value : DONATION_TYPES.ONLINE;

  // Create phone field if permission is set
  if (fieldValues.permissionPhone === 1 && fieldValues.mobile !== null) {
    fieldValues.phone = fieldValues.mobile;
  }

  // Create name based on Form type
  const name = update ? 'GiftAidUpdate' : 'GiftAid';

  // remove giftaid form field if it exists
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
