const { selectors } = require('./locators');
const Chance = require('chance');
const chance = new Chance();

class Commands {
  constructor(page) {
    this.page = page;
  }
  
  /**
   * Generate a random string of 5 lowercase letters.
   * @return {Promise<string>} A promise that resolves to a random string.
   */
  async randomString() {
    return chance.string({ length: 5, pool: 'abcdefghijklmnopqrstuvwxyz' });
  }

  /**
   * Populate giftaid form fields
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
    await this.page.locator(selectors.formFields.mobile).fill(mobile);
    await this.page.locator(selectors.formFields.firstName).fill(firstName);
    await this.page.locator(selectors.formFields.lastName).fill(lastName);
    await this.page.locator(selectors.formFields.postcode).fill(postcode);
    await this.page.locator(selectors.address.manualAddressLink).click();
    await this.page.locator(selectors.address.address1).fill(address1);
    await this.page.locator(selectors.address.address2).fill(address2);
    await this.page.locator(selectors.address.address3).fill(address3);
    await this.page.locator(selectors.address.town).fill(town);
  }

  /**
   * Select marketing preferences opt ins
   * @param options - Optional marketing preferences.
   */
  async selectMarketingPrefs({
    email = `giftaid-staging-${Date.now()}@email.sls.comicrelief.com`,
    phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '')
  } = {}) {
    await this.page.locator(selectors.marketingPreferences.options.email).click();
    await this.page.locator(selectors.marketingPreferences.fields.email).fill(email);
  
    await this.page.locator(selectors.marketingPreferences.options.phone).click();
    await this.page.locator(selectors.marketingPreferences.fields.phone).fill(phone);
  
    await this.page.locator(selectors.marketingPreferences.options.text).check({ force: true });
  }

  /**
   * Populate giftaid update form fields
   * @param userData - Optional user data for form filling.
   */
  async populateUpdateFormFields({
    firstName = 'test',
    lastName = chance.last(),
    email = `giftaid-update-staging-${chance.email()}`,
    mobile = '07516144519',
    postcode = chance.postcode(),
    address1 = chance.address(),
    address2 = chance.street(),
    address3 = 'test address 3',
    town = chance.city(),
  } = {}) {
    await this.page.locator(selectors.formFields.firstName).fill(firstName);
    await this.page.locator(selectors.formFields.lastName).fill(lastName);
    await this.page.locator(selectors.formFields.postcode).fill(postcode);
    await this.page.locator(selectors.formFields.email).fill(email);
    await this.page.locator(selectors.formFields.mobile).fill(mobile);
    await this.page.locator(selectors.address.manualAddressLink).click();
    await this.page.locator(selectors.address.address1).fill(address1);
    await this.page.locator(selectors.address.address2).fill(address2);
    await this.page.locator(selectors.address.address3).fill(address3);
    await this.page.locator(selectors.address.town).fill(town);
  }
}

module.exports = Commands;
