const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I enter the local mobile number {string}', async function (mobile) {
  await this.page.locator('#field-input--mobile').fill('');
  await this.page.locator('#field-input--mobile').type(mobile, { delay: 100 });
});

Then('I should see the local mobile error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--mobile > span')).toHaveText(message);
});

When('I complete the local Giftaid form with the first name {string}', async function (firstName) {
  await this.commands.populateFormFields(this.page, { firstName });
});

When('I enter the local first name {string}', async function (firstName) {
  const value = firstName === 'SPACE' ? ' ' : firstName;
  await this.page.locator('#field-input--firstname').fill(value);
});

Then('I should see the local first name error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--firstname')).toHaveText(message);
});

When('I enter the local last name {string}', async function (lastName) {
  const value = lastName === 'SPACE' ? ' ' : lastName;
  await this.page.locator('#field-input--lastname').fill(value);
});

Then('I should see the local last name error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--lastname > span')).toHaveText(message);
});

Then('I should not see the local last name error message', async function () {
  await expect(this.page.locator('div#field-error--lastname > span')).toHaveCount(0);
});
