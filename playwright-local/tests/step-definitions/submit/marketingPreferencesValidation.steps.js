const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;
// Use a standard UK phone number for the marketing preference phone field
const phone = '02085694240';

When('I select all the local marketing preference options', async function () {
  const marketingOptions = [
    selectors.marketingPreferences.options.email,
    selectors.marketingPreferences.options.phone,
    selectors.marketingPreferences.options.text,
  ];
  
  for (const option of marketingOptions) {
    const checkbox = this.page.locator(option);
    
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check({ force: true });
    
    await expect(checkbox).toBeChecked();
  }
});

When('I select the local email marketing preference', async function () {
  await this.page.locator(selectors.marketingPreferences.options.email).click();
});

When('I select the local phone marketing preference', async function () {
  await this.page.locator(selectors.marketingPreferences.options.phone).click();
});

When('I enter the local marketing email', async function () {
  await expect(this.page.locator(selectors.marketingPreferences.fields.email)).toBeVisible();
  await this.page.locator(selectors.marketingPreferences.fields.email).fill(email);
});

When('I clear the local marketing email', async function () {
  await this.page.locator(selectors.marketingPreferences.fields.email).fill('');
});

When('I enter an invalid local marketing email {string}', async function (invalidEmail) {
  await this.page.locator(selectors.marketingPreferences.fields.email).fill(invalidEmail);
});

When('I enter the local marketing phone', async function () {
  await expect(this.page.locator(selectors.marketingPreferences.fields.phone)).toBeVisible();
  await this.page.locator(selectors.marketingPreferences.fields.phone).fill(phone);
});

When('I clear the local marketing phone', async function () {
  await this.page.locator(selectors.marketingPreferences.fields.phone).fill('');
});

When('I enter an invalid local marketing phone {string}', async function (invalidPhone) {
  await this.page.locator(selectors.marketingPreferences.fields.phone).fill(invalidPhone);
});

Then('I should see the local marketing phone error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.phone)).toHaveText(message);
});

Then('I should see the local marketing email error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.email)).toHaveText(message);
});
