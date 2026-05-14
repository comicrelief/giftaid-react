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
    await this.page.locator('#field-input--mobile').fill(mobile);
    await this.page.locator('input#field-input--firstname').fill(firstName);
    await this.page.locator('input#field-input--lastname').fill(lastName);
    await this.page.locator('input#field-input--postcode').fill(postcode);
    await this.page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await this.page.locator('input#field-input--address1').fill(address1);
    await this.page.locator('input#field-input--address2').fill(address2);
    await this.page.locator('input#field-input--address3').fill(address3);
    await this.page.locator('input#field-input--town').fill(town);
  }

  /**
   * Select marketing preferences opt ins
   * @param options - Optional marketing preferences.
   */
  async selectMarketingPrefs({
    email = `giftaid-staging-${Date.now()}@email.sls.comicrelief.com`,
    phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '')
  } = {}) {
    await this.page.locator('#field-wrapper--Email > div').click();
    await this.page.locator('input#field-input--email').fill(email);
  
    await this.page.locator('#field-wrapper--Phone > div').click();
    await this.page.locator('input#field-input--phone').fill(phone);
  
    await this.page.locator('input#field-label--Text--SMS').check({ force: true });
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
    await this.page.locator('input#field-input--firstname').fill(firstName);
    await this.page.locator('input#field-input--lastname').fill(lastName);
    await this.page.locator('input#field-input--postcode').fill(postcode);
    await this.page.locator('input#field-input--email').fill(email);
    await this.page.locator('#field-input--mobile').fill(mobile);
    await this.page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await this.page.locator('input#field-input--address1').fill(address1);
    await this.page.locator('input#field-input--address2').fill(address2);
    await this.page.locator('input#field-input--address3').fill(address3);
    await this.page.locator('input#field-input--town').fill(town);
  }
}

module.exports = Commands;
