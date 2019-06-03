import SiteService from "../../../../service/Site.service";

const site = new SiteService();

export const getFormValues = (validation) => {
  // create field values
  const fieldValues = {};
  Object.keys(validation).forEach((key) => {
    let value = validation[key].value;
    if (key === 'confirm') {
      value = validation[key].value === true ? 1 : 0;
    }
    // set values for marketing consent checkboxes and fields
    if (/^permission/.test(key) && value !== null) {
      if (value === 'yes' && validation[key].fieldValidation !== false) {
        const fields = validation[key].fieldValidation;
        Object.keys(fields).forEach(name => fieldValues[name] = fields[name].value);
      }
      value = value === 'no' ? 0 : 1;
    }

    fieldValues[key] = value;
  });
  // create phone field if permission is set
  if (fieldValues.permissionPhone === 1 && fieldValues.mobile !== null) {
    fieldValues.phone = fieldValues.mobile;
  }
  const url = site.getCurrentUrl();
  const campaign = site.get('campaign').name;

  return Object.assign({}, {
    campaign: campaign,
    transSource: `${campaign}_GiftAid`,
    transSourceUrl: url,
    transType: 'GiftAid',
    timestamp: site.getTimestamp(),
  }, fieldValues);
};

export default {
  getFormValues,
}
