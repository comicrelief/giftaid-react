const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const Chance = require('chance');
const chance = new Chance();

const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;
const phone = chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, '');

const marketingOptions = [
  '[aria-label="field-label--Email--Email"]',
  '[aria-label="field-label--Phone--Phone"]',
  '[aria-label="field-label--Text--SMS"]',
];

When('I select all the local marketing preference options', async function () {
  for (const option of marketingOptions) {
    await this.page.locator(option).click();
    await expect(this.page.locator(option)).toBeChecked();
  }
});

When('I select the local email marketing preference', async function () {
  await this.page.locator('[aria-label="field-label--Email--Email"]').click();
});

When('I select the local phone marketing preference', async function () {
  await this.page.locator('[aria-label="field-label--Phone--Phone"]').click();
});

When('I enter the local marketing email', async function () {
  await expect(this.page.locator('input#field-input--email')).toBeVisible();
  await this.page.locator('input#field-input--email').fill(email);
});

When('I clear the local marketing email', async function () {
  await this.page.locator('input#field-input--email').fill('');
});

When('I enter an invalid local marketing email {string}', async function (invalidEmail) {
  await this.page.locator('input#field-input--email').fill(invalidEmail);
});

Then('I should see the local marketing email error message {string}', async function (message) {
  await expect(this.page.locator('#field-error--email')).toHaveText(message);
});

When('I enter the local marketing phone', async function () {
  await expect(this.page.locator('input#field-input--phone')).toBeVisible();
  await this.page.locator('input#field-input--phone').fill(phone);
});

When('I clear the local marketing phone', async function () {
  await this.page.locator('input#field-input--phone').fill('');
});

When('I enter an invalid local marketing phone {string}', async function (invalidPhone) {
  await this.page.locator('input#field-input--phone').fill(invalidPhone);
});

Then('I should see the local marketing phone error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--phone > span')).toHaveText(message);
});
