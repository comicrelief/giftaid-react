const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Chance = require('chance');
const { selectors } = require('../../utils/locators');

const chance = new Chance();

const email = `giftaid-update-staging-${chance.email()}`;
const phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '');

When('I select all marketing preference options', async function () {
  const marketingOptions = [
    selectors.marketingPreferences.options.email,
    selectors.marketingPreferences.options.phone,
    selectors.marketingPreferences.options.text,
  ];
  
  for (const option of marketingOptions) {
    await this.page.click(option);
    expect(await this.page.locator(option).isChecked()).toBeTruthy();
  }
});

When('I enter valid marketing preference contact details', async function () {
  await expect(this.page.locator(selectors.marketingPreferences.fields.email)).toBeVisible();
  await this.page.fill(selectors.marketingPreferences.fields.email, email);
  
  await expect(this.page.locator(selectors.marketingPreferences.fields.phone)).toBeVisible();
  await this.page.fill(selectors.marketingPreferences.fields.phone, phone);
});

When('I select email marketing preference', async function () {
  await this.page.click(selectors.marketingPreferences.options.email);
});

When('I enter valid marketing preference email', async function () {
  await this.page.fill(selectors.marketingPreferences.fields.email, email);
});

When('I clear marketing preference email', async function () {
  await this.page.fill(selectors.marketingPreferences.fields.email, '');
});

When('I enter invalid marketing preference email {string}', async function (invalidEmail) {
  await this.page.fill(selectors.marketingPreferences.fields.email, invalidEmail);
});

Then('I should see marketing preference email error {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.email)).toHaveText(message);
});

When('I select phone marketing preference', async function () {
  await this.page.click(selectors.marketingPreferences.options.phone);
});

When('I enter valid marketing preference phone', async function () {
  await this.page.fill(selectors.marketingPreferences.fields.phone, phone);
});

When('I clear marketing preference phone', async function () {
  await this.page.fill(selectors.marketingPreferences.fields.phone, '');
});

When('I enter invalid marketing preference phone {string}', async function (invalidPhone) {
  await this.page.fill(selectors.marketingPreferences.fields.phone, invalidPhone);
});

Then('I should see marketing preference phone error {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.phone)).toHaveText(message);
});
