import SiteService from "../../../../service/Site.service";

import { DONATION_TYPES } from "../Fields/defaultUpdateFormFields";

const site = new SiteService();

export const getFormValues = (validation, urlId = null) => {

  // Set donation id depending on form or url trans Id
  const donationID = typeof validation.transactionId !== 'undefined'
  && validation.transactionId
    ? validation.transactionId.value : urlId;

  //const url = site.getCurrentUrl();
  //const campaign = site.get('campaign').name;

  const donationType = typeof validation.donationType !== 'undefined'
  && validation.donationType
    ? validation.donationType.value : DONATION_TYPES.ONLINE;

  const url = site.getCurrentUrl();
  const campaign = site.get('campaign').name;

  return {
    campaign: campaign,
    transSource: `${campaign}_GiftAidUpdate`,
    transSourceUrl: url,
    transType: 'GiftAidUpdate',
    timestamp: site.getTimestamp(),
    email: validation.emailaddress.value,
    postcode: validation.postcode.value,
    donationID,
    donationType,
    firstname: validation.firstname.value,
    lastname: validation.lastname.value,
    address1: validation.address1.value,
    address2: validation.address2.value,
    address3: validation.address3.value,
    town: validation.town.value,
    country: validation.country.value,
    confirm: validation.giftAidClaimChoice.value,
  };

};

export default {
  getFormValues,
}
