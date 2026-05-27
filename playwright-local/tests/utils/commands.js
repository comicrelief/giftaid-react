const Chance = require('chance');
const chance = new Chance();
const { selectors } = require('./../utils/locators');

class Commands {
  constructor(page) {
    this.page = page;
  }
  
  /**
   * Populate giftaid from fields
   * @param userData - Optional user data for form filling.
   */
  async populateFormFields({
    mobile = chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''), // Remove spaces from the phone number
    firstName = 'test',
    lastName = chance.last(),
    postcode = chance.postcode(),
    address1 = chance.address(),
    address2 = chance.street(),
    address3 = 'test address 3',
    town = chance.city(),
  } = {}) {
    await this.page.locator(selectors.formFields.mobile).type(mobile);
    await this.page.locator(selectors.formFields.firstName).type(firstName);
    await this.page.locator(selectors.formFields.lastName).type(lastName);
    await this.page.locator(selectors.formFields.postcode).type(postcode);
    await this.page.locator(selectors.address.manualAddressLink).click();
    await this.page.locator(selectors.address.address1).type(address1);
    await this.page.locator(selectors.address.address2).type(address2);
    await this.page.locator(selectors.address.address3).type(address3);
    await this.page.locator(selectors.address.town).type(town);
  }
  
  /**
   * Select marketing preferences opt ins
   * @param options - Optional marketing preferences.
   */
  async selectMarketingPrefs({
    email = `giftaid-staging-${chance.email()}`,
    phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '') // UK phone number
  } = {}) {
    await this.page.locator(selectors.marketingPreferences.options.email).click();
    await this.page.locator(selectors.marketingPreferences.fields.email).type(email);
    await this.page.locator(selectors.marketingPreferences.options.phone).click();
    await this.page.locator(selectors.marketingPreferences.fields.phone).type(phone, { delay: 200 });
    await this.page.locator(selectors.marketingPreferences.options.text).check({ force: true });
  }
  
  /**
   * Populate giftaid update from fields
   * @param userData - Optional user data for form filling.
   */
  async populateUpdateFormFields({
    firstName = 'test',
    lastName = chance.last(),
    email = `giftaid-update-staging-${chance.email()}`,
    postcode = chance.postcode(),
    address1 = chance.address(),
    address2 = chance.street(),
    address3 = 'test address 3',
    town = chance.city(),
    mobile = '07516144519'
  } = {}) {
    await this.page.locator(selectors.formFields.firstName).fill(firstName);
    await this.page.locator(selectors.formFields.lastName).fill(lastName);
    await this.page.locator(selectors.formFields.postcode).fill(postcode);
    await this.page.locator(selectors.formFields.email).fill(email);
    await this.page.locator(selectors.address.manualAddressLink).click();
    await this.page.locator(selectors.address.address1).fill(address1);
    await this.page.locator(selectors.address.address2).fill(address2);
    await this.page.locator(selectors.address.address3).fill(address3);
    await this.page.locator(selectors.address.town).fill(town);
    await this.page.locator(selectors.formFields.mobile).type(mobile);
  }
}

module.exports = { Commands };
