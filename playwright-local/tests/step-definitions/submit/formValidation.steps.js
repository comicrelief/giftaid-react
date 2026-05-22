const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I enter the local mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.page.locator(selectors.formFields.mobile).type(mobile, { delay: 100 });
});

Then('I should see the local mobile error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.mobile)).toHaveText(message);
});

When('I complete the local Giftaid form with the first name {string}', async function (firstName) {
  await this.commands.populateFormFields(this.page, { firstName });
});

When('I enter the local first name {string}', async function (firstName) {
  const value = firstName === 'SPACE' ? ' ' : firstName;
  await this.page.locator(selectors.formFields.firstName).fill(value);
});

Then('I should see the local first name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toHaveText(message);
});

When('I enter the local last name {string}', async function (lastName) {
  const value = lastName === 'SPACE' ? ' ' : lastName;
  await this.page.locator(selectors.formFields.lastName).fill(value);
});

Then('I should see the local last name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.lastName)).toHaveText(message);
});

Then('I should not see the local last name error message', async function () {
  await expect(this.page.locator(selectors.errorMessages.lastName)).toHaveCount(0);
});
