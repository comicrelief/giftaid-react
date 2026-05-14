const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I am on the Giftaid update page', async function () {
  await this.page.goto(`${process.env.BASE_URL}update`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

When('I complete the Giftaid update form with valid details', async function () {
  await this.commands.populateUpdateFormFields();
});

When('I submit the Giftaid update form', async function () {
  await this.page.click(selectors.formFields.submitButton);
});

When('I select yes for GiftAid declaration', async function () {
  await this.page.click(selectors.giftAidClaimChoice.yes);
});

When('I select no for GiftAid declaration', async function () {
  await this.page.click(selectors.giftAidClaimChoice.no);
});

When('I enter the update postcode {string}', async function (postcode) {
  await this.page.fill(selectors.formFields.postcode, '');
  await this.page.type(selectors.formFields.postcode, postcode);
});

Then('I should see the update postcode error message {string}', async function (message) {
  await expect(this.page.locator(selectors.errorMessages.postcode)).toBeVisible();
  await expect(this.page.locator(selectors.errorMessages.postcode)).toHaveText(message);
});

Then('I should see the update thank you message for {string}', async function (firstName) {
  await expect(this.page.locator(selectors.success.heading)).toHaveText(`Thank you, ${firstName}!`);
});

Then('I should see the update no declaration message', async function () {
  await expect(this.page.locator(selectors.success.heading)).toHaveText('Thanks for letting us know');
});

Then('I should see the update thank you message', async function () {
  await expect(this.page.locator(selectors.success.heading)).toContainText('Thank you, test!');
});
