const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I enter mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.page.locator(selectors.formFields.mobile).type(mobile, { delay: 100 });
});

Then('I should see mobile error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.mobile)).toHaveText(message);
});

When('I complete the Giftaid form with mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.commands.populateFormFields(this.page, { mobile });
});

When('I enter first name {string}', async function (firstName) {
  const value = firstName === 'SPACE' ? ' ' : firstName;
  await this.page.locator(selectors.formFields.firstName).fill(value);
});

Then('I should see first name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toHaveText(message);
});

When('I complete the Giftaid form with first name {string}', async function (firstName) {
  await this.page.locator(selectors.formFields.firstName).fill('');
  await this.commands.populateFormFields(this.page, { firstName });
});

Then('I should see thank you message for {string}', async function (firstName) {
  await expect(this.page.locator(selectors.success.heading)).toHaveText(`Thank you, ${firstName}!`);
});

When('I enter last name {string}', async function (lastName) {
  const value = lastName === 'SPACE' ? ' ' : lastName;
  await this.page.locator(selectors.formFields.lastName).fill(value);
});

Then('I should see last name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.lastName)).toHaveText(message);
});

Then('I should not see last name error message', async function () {
  expect(await this.page.locator(selectors.errorMessages.lastName).count()).toEqual(0);
});
