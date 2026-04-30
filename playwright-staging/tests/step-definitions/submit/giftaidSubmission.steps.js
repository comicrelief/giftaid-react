const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I am on the Giftaid page', async function () {
  await this.page.goto(process.env.BASE_URL, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

When('I select Giftaid', async function () {
  await this.page.click(selectors.giftaid.option);
});

When('I complete the Giftaid form with valid details', async function () {
  await this.commands.populateFormFields(this.page);
});

When('I select marketing preferences', async function () {
  await this.commands.selectMarketingPrefs(this.page);
});

When('I submit the Giftaid form', async function () {
  await Promise.all([
    this.page.waitForNavigation(),
    this.page.click(selectors.formFields.submitButton),
  ]);
});

Then('I should see the Giftaid thank you message', async function () {
  await expect(this.page.locator(selectors.success.heading)).toHaveText('Thank you, test!');
});
