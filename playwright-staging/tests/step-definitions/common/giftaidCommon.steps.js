const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I submit the Giftaid form', async function () {
  await this.page.locator(selectors.formFields.submitButton).click();
  await this.page.waitForLoadState('networkidle');
});

When('I select the marketing preferences', async function () {
  await this.commands.selectMarketingPrefs(this.page, {
    email: this.supporter.email,
    phone: this.supporter.phone,
  });
});

When('I complete the Giftaid form with valid details', async function () {
  await this.commands.populateFormFields(this.page);
});

Then('I should be redirected to the Giftaid homepage', async function () {
  await expect(this.page.locator(selectors.homepage.heading)).toContainText('Giftaid it');
});
