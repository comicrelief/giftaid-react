// const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();

class Commands {
  constructor(page) {
    this.page = page;
    // this.transactionId = uuidv4();
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
    await page.locator('#field-input--mobile').type(mobile);
    await page.locator('input#field-input--firstname').type(firstName);
    await page.locator('input#field-input--lastname').type(lastName);
    await page.locator('input#field-input--postcode').type(postcode);
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await page.locator('input#field-input--address1').type(address1);
    await page.locator('input#field-input--address2').type(address2);
    await page.locator('input#field-input--address3').type(address3);
    await page.locator('input#field-input--town').type(town);
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
    await page.locator('#field-wrapper--Email > div').click();
    await page.locator('input#field-input--email').type(email);
    await page.locator('#field-wrapper--Phone > div').click();
    await page.locator('input#field-input--phone').type(phone, { delay: 200 });
    await page.locator('input#field-label--Text--SMS').click();
  }
  
  /**
   * Populate giftaid update from fields
   * @param page - Playwright page object.
   * @param userData - Optional user data for form filling.
   */
  async populateUpdateFormFields(page, {
    // transactionID = this.transactionId,
    firstName = 'test',
    lastName = chance.last(),
    email = `giftaid-update-staging-${chance.email()}`,
    postcode = chance.postcode(),
    address1 = chance.address(),
    address2 = chance.street(),
    address3 = 'test address 3',
    town = chance.city(),
  } = {}) {
    // await page.locator('input#field-input--transactionId').fill(transactionID);
    // console.log('transactionId is:', transactionID);
    await page.locator('input#field-input--firstname').fill(firstName);
    await page.locator('input#field-input--lastname').fill(lastName);
    await page.locator('input#field-input--postcode').fill(postcode);
    await page.locator('input#field-input--email').fill(email);
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await page.locator('input#field-input--address1').fill(address1);
    await page.locator('input#field-input--address2').fill(address2);
    await page.locator('input#field-input--address3').fill(address3);
    await page.locator('input#field-input--town').fill(town);
  }
}

module.exports = { Commands };
