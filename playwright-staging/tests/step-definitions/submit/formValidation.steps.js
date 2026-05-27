const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

// When steps
When('I enter the mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.page.locator(selectors.formFields.mobile).type(mobile, { delay: 100 });
});

When('I complete the Giftaid form with the mobile number {string}', async function (mobile) {
  await this.page.locator(selectors.formFields.mobile).fill('');
  await this.commands.populateFormFields({ mobile });
});

When('I enter the first name {string}', async function (firstName) {
  const value = firstName === 'SPACE' ? ' ' : firstName;
  await this.page.locator(selectors.formFields.firstName).fill(value);
});

When('I complete the Giftaid form with the first name {string}', async function (firstName) {
  await this.page.locator(selectors.formFields.firstName).fill('');
  await this.commands.populateFormFields({ firstName });
});

When('I enter the last name {string}', async function (lastName) {
  const value = lastName === 'SPACE' ? ' ' : lastName;
  await this.page.locator(selectors.formFields.lastName).fill(value);
});

// Then steps
Then('I should see the mobile error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.mobile)).toHaveText(message);
});

Then('I should see the first name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.firstName)).toHaveText(message);
});

Then('I should see the thank you message for {string}', async function (firstName) {
  await expect(this.page.locator(selectors.success.heading)).toHaveText(`Thank you, ${firstName}!`);
});

Then('I should see the last name error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.lastName)).toHaveText(message);
});

Then('I should not see the last name error message', async function () {
  expect(await this.page.locator(selectors.errorMessages.lastName).count()).toEqual(0);
});
