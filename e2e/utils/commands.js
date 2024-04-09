const faker = require('faker');

class Commands {
  constructor(page) {
    this.page = page;

    // form inputs
    this.mobile = page.locator('#field-input--mobile');
    this.phone = page.locator('#field-input--phone');
    this.firstName = page.locator('input#field-input--firstname');
    this.lastName = page.locator('input#field-input--lastname');
    this.email = page.locator('input#field-input--email');
    this.postcode = page.locator('input#field-input--postcode');
    this.submit = page.locator('button[type=submit]');

    // enter address manually link
    this.manualAddressLink = page.locator('a[aria-describedby=field-error--addressDetails]');
    this.address1 = page.locator('input#field-input--address1');
    this.address2 = page.locator('input#field-input--address2');
    this.address3 = page.locator('input#field-input--address3');
    this.town = page.locator('input#field-input--town');
    this.country = page.locator('#field-select--country');

    // marketing preferences
    this.mpEmail = page.locator('#field-wrapper--Email > div');
    this.mpPhone = page.locator('#field-wrapper--Phone > div');
    //this.mpPost = page.locator('input#field-label--Post--Post');
    this.mpSMS = page.locator('input#field-label--Text--SMS');
    this.inputMPEmail = page.locator('input#field-input--email');
    this.inputMPPhone = page.locator('input#field-input--phone');
  }

  /**
   * Populate giftaid from fields
   * @param userData
   */
  async populateFormFields(
    {
      mobile = faker.phone.phoneNumber('078########'),
      firstName = 'test',
      lastName = 'user',
      postcode = 'SE1 7TP',
      address1 = 'COMIC RELIEF',
      address2 = 'CAMELFORD HOUSE 87-90',
      address3 = 'ALBERT EMBANKMENT',
      town = 'London',
    } = {},
  ) {
    await this.mobile.type(mobile);
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.postcode.type(postcode);
    await this.manualAddressLink.click();
    await this.address1.type(address1);
    await this.address2.type(address2);
    await this.address3.type(address3);
    await this.town.type(town);
  }

  /**
   * Select marketing preferences opt ins
   */
  async selectMarketingPrefs(
    {
      email = 'giftaid-staging-@email.sls.comicrelief.com',
      phone = faker.phone.phoneNumber('0208#######'),
    } = {},
  ) {
    await this.mpEmail.click();
    await this.inputMPEmail.type(email);
    // await this.mpPost.click();
    await this.mpPhone.click();
    await this.inputMPPhone.type(phone, { delay: 200 });
    await this.mpSMS.click();
  }

  /**
   * Populate giftaid update from fields
   * @param userData
   */
  async populateUpdateFormFields(
    {
      firstName = 'test',
      lastName = 'user',
      email = 'giftaid-update-staging-@email.sls.comicrelief.com',
      postcode = 'SE1 7TP',
      address1 = 'COMIC RELIEF',
      address2 = 'CAMELFORD HOUSE 87-90',
      address3 = 'ALBERT EMBANKMENT',
      town = 'London',
    } = {},
  ) {
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.postcode.type(postcode);
    await this.email.type(email);
    await this.manualAddressLink.click();
    await this.address1.type(address1);
    await this.address2.type(address2);
    await this.address3.type(address3);
    await this.town.type(town);
  }
}

module.exports = { Commands };
