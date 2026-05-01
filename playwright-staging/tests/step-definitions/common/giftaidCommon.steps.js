const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I submit the Giftaid form', async function () {
  await this.page.click(selectors.formFields.submitButton);
});

When('I select marketing preferences', async function () {
  await this.commands.selectMarketingPrefs(this.page);
});

When('I complete the Giftaid form with valid details', async function () {
  await this.commands.populateFormFields(this.page);
});
