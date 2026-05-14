const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Chance = require('chance');
const { selectors } = require('../../utils/locators');

const chance = new Chance();

When('I submit the Giftaid form', async function () {
  await this.page.locator(selectors.formFields.submitButton).click();
});

When('I select the marketing preferences', async function () {
  await this.commands.selectMarketingPrefs({
    email: this.supporter?.email,
    phone: this.supporter?.phone,
  });
});

When('I complete the Giftaid form with valid details', async function () {
  this.supporter = {
    firstName: chance.first(),
    lastName: chance.last(),
    mobile: chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, ''),
    postcode: chance.postcode(),
    address1: chance.address(),
    address2: chance.street(),
    address3: 'test address 3',
    town: chance.city(),
  };
  
  await this.commands.populateFormFields(this.supporter);
});

Then('I should be redirected to the Giftaid homepage', async function () {
  await expect(this.page.locator(selectors.homepage.heading)).toContainText('Giftaid it');
});
