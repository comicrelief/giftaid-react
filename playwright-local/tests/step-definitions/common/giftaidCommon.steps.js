const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

// Given steps
Given('I am on the local Giftaid page', async function () {
  await this.page.goto(process.env.BASE_URL, {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
});

Given('I select the local Giftaid option', async function () {
  await this.page.locator(selectors.giftaid.option).click();
});

Given('I enter the local supporter details', async function () {
  await this.page.locator(selectors.formFields.mobile).fill('07123456789');
  await this.page.locator(selectors.formFields.firstName).fill('test');
  await this.page.locator(selectors.formFields.lastName).fill('user');
});

// When steps
When('I submit the local Giftaid form', async function () {
  await this.page.locator(selectors.formFields.submitButton).click();
});

When('I enter the local postcode {string}', async function (postcode) {
  await this.page.locator(selectors.formFields.postcode).fill(postcode);
});

When('I search for the local postcode', async function () {
  await this.page.locator(selectors.formFields.postcodeLookup).click();
});

When('I click the local manual address link', async function () {
  await this.page.locator(selectors.address.manualAddressLink).click();
});

When('I complete the local Giftaid form with valid details', async function () {
  await this.commands.populateFormFields({ mobile: '07123456789' });
});

When('I select the local marketing preferences', async function () {
  await this.commands.selectMarketingPrefs();
});

// Then steps
Then('I should see the local postcode error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.postcode)).toBeVisible();
  await expect(this.page.locator(selectors.errorMessages.postcode)).toContainText(message);
});

Then('I should not see the local postcode error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.postcode)).not.toBeVisible();
});

Then('I should see the local thank you message {string}', async function (message) {
  await expect(this.page.locator(selectors.success.heading)).toHaveText(message, { timeout: 20000 });
});
