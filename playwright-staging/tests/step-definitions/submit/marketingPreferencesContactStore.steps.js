const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Chance = require('chance');
const { MarketingPrefsVerify } = require('../../utils/marketingPrefsVerify');
const { selectors } = require('../../utils/locators');

const chance = new Chance();

When('I populate the Giftaid form with generated supporter details', async function () {
  this.supporter = {
    firstName: chance.first(),
    lastName: chance.last(),
    phone: chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, ''), // UK phone number
    mobile: chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''), // UK mobile number
    address1: chance.street(),
    address2: chance.street(),
    address3: chance.city(),
    postcode: 'SE1 7TP',
    town: chance.county(),
    email: `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`,
  };
  
  // Populate all input fields using Commands class
  await this.commands.populateFormFields(this.page, {
    mobile: this.supporter.mobile,
    firstName: this.supporter.firstName,
    lastName: this.supporter.lastName,
    address1: this.supporter.address1,
    address2: this.supporter.address2,
    address3: this.supporter.address3,
    town: this.supporter.town,
    postcode: this.supporter.postcode,
    email: this.supporter.email,
  });
});

When('I select generated marketing preferences', async function () {
  // Select marketing preferences using Commands class
  await this.commands.selectMarketingPrefs(this.page, {
    email: this.supporter.email,
    phone: this.supporter.phone,
  });
});

Then('I should see the generated supporter thank you message', async function () {
  // Verify success message
  await expect(this.page.locator(selectors.success.heading)).toHaveText(`Thank you, ${this.supporter.firstName}!`);
});

Then('the marketing preferences data should be stored in contact-store', async function () {
  // Retrieve and verify marketing preferences data
  const mpData = await MarketingPrefsVerify.get(this.supporter.email);
  
  expect(mpData.campaign).toEqual('RND26');
  expect(mpData.firstname).toEqual(this.supporter.firstName);
  expect(mpData.lastname).toEqual(this.supporter.lastName);
  expect(mpData.email).toEqual(this.supporter.email);
  expect(mpData.address1).toEqual(this.supporter.address1);
  expect(mpData.town).toEqual(this.supporter.town);
  expect(mpData.country).toEqual('GB');
  expect(mpData.transsourceurl).toContain(process.env.BASE_URL);
  expect(mpData.transsource).toEqual('RND26_GiftAid');
  expect(mpData.transtype).toEqual('prefs');
  expect(mpData.permissionemail).toEqual('1');
  expect(mpData.permissionsms).toEqual('1');
  expect(mpData.permissionphone).toEqual('1');
  expect(mpData.phone).toEqual(this.supporter.phone);
  expect(mpData.mobile).toEqual(this.supporter.mobile.replace(/^[07]{1}/, '+44'));
});
