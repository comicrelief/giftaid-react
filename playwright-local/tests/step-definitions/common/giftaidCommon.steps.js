const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the local Giftaid page', async function () {
  await this.page.goto(process.env.BASE_URL, {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
});

Given('I select the local Giftaid option', async function () {
  await this.page.locator('#field-label--giftaid').click();
});

Given('I enter the local supporter details', async function () {
  await this.page.locator('#field-input--mobile').fill('07123456789');
  await this.page.locator('input#field-input--firstname').fill('test');
  await this.page.locator('input#field-input--lastname').fill('user');
});

When('I submit the local Giftaid form', async function () {
  await this.page.locator('button[type=submit]').click();
});

When('I enter the local postcode {string}', async function (postcode) {
  await this.page.locator('input#field-input--postcode').fill(postcode);
});

When('I search for the local postcode', async function () {
  await this.page.locator('#postcode_button').click();
});

When('I click the local manual address link', async function () {
  await this.page.locator('a[aria-describedby=field-error--addressDetails]').click();
});

Then('I should see the local postcode error message {string}', async function (message) {
  await expect(this.page.locator('div#field-error--postcode > span')).toBeVisible();
  await expect(this.page.locator('div#field-error--postcode > span')).toContainText(message);
});

Then('I should not see the local postcode error message', async function () {
  await expect(this.page.locator('div#field-error--postcode > span')).not.toBeVisible();
});

Then('I should see the local thank you message {string}', async function (message) {
  await expect(this.page.locator('div > h1')).toHaveText(message, { timeout: 15000 });
});

Then('I should see the local thank you message containing {string}', async function (message) {
  await expect(this.page.locator('div > h1')).toContainText(message, { timeout: 15000 });
});

When('I complete the local Giftaid form with valid details', async function () {
  await this.commands.populateFormFields(this.page, { mobile: '07123456789' });
});

When('I select the local marketing preferences', async function () {
  await this.commands.selectMarketingPrefs(this.page);
});
