const Chance = require('chance');
const chance = new Chance();
const { selectors } = require('./../utils/locators');

class Commands {
  constructor(page) {
    this.page = page;
  }
  
  /**
   * Populate giftaid from fields
   * @param page - Playwright page object.
   * @param userData - Optional user data for form filling.
   */
  async populateFormFields(page, {
    mobile = chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''), // Remove spaces from the phone number
    firstName = 'test',
    lastName = chance.last(),
    postcode = chance.postcode(),
    address1 = chance.address(),
    address2 = chance.street(),
    address3 = 'test address 3',
    town = chance.city(),
  } = {}) {
    await page.locator(selectors.formFields.mobile).type(mobile);
    await page.locator(selectors.formFields.firstName).type(firstName);
    await page.locator(selectors.formFields.lastName).type(lastName);
    await page.locator(selectors.formFields.postcode).type(postcode);
    await page.locator(selectors.address.manualAddressLink).click();
    await page.locator(selectors.address.address1).type(address1);
    await page.locator(selectors.address.address2).type(address2);
    await page.locator(selectors.address.address3).type(address3);
    await page.locator(selectors.address.town).type(town);
  }
  
  /**
   * Select marketing preferences opt ins
   * @param page - Playwright page object.
   * @param options - Optional marketing preferences.
   */
  async selectMarketingPrefs(page, {
    email = `giftaid-staging-${chance.email()}`,
    phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '') // UK phone number
  } = {}) {
    await page.locator(selectors.marketingPreferences.options.email).click();
    await page.locator(selectors.marketingPreferences.fields.email).type(email);
    await page.locator(selectors.marketingPreferences.options.phone).click();
    await page.locator(selectors.marketingPreferences.fields.phone).type(phone, { delay: 200 });
    await page.locator(selectors.formFields.mobile).click();
  }
  
  /**
   * Populate giftaid update from fields
   * @param page - Playwright page object.
   * @param userData - Optional user data for form filling.
   */
  async populateUpdateFormFields(page, {
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
    await page.locator(selectors.formFields.firstName).fill(firstName);
    await page.locator(selectors.formFields.lastName).fill(lastName);
    await page.locator(selectors.formFields.postcode).fill(postcode);
    await page.locator(selectors.formFields.email).fill(email);
    await page.locator(selectors.address.manualAddressLink).click();
    await page.locator(selectors.address.address1).fill(address1);
    await page.locator(selectors.address.address2).fill(address2);
    await page.locator(selectors.address.address3).fill(address3);
    await page.locator(selectors.address.town).fill(town);
    await page.locator(selectors.formFields.mobile).type(mobile);
  }
}

module.exports = { Commands };
