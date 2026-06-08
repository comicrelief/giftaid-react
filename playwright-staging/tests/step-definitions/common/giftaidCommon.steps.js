const { When, Then, Given} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Chance = require('chance');
const { selectors } = require('../../utils/locators');

const chance = new Chance();

// Given steps
Given('I am on the Giftaid page', async function () {
  await this.page.goto(process.env.BASE_URL, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

// When steps
When('I select the Giftaid option', async function () {
  await this.page.click(selectors.giftaid.option);
});

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

// Then steps
Then('I should see the Giftaid thank you message', async function () {
  const expectedFirstName = this.supporter?.firstName || 'test';
  await expect(this.page.locator('h1')).toContainText(
    `Thank you, ${expectedFirstName}!`,
    { timeout: 30000 }
  );
});

Then('I should be redirected to the Giftaid homepage', async function () {
  await expect(this.page.locator(selectors.homepage.heading)).toContainText('Giftaid it');
});
