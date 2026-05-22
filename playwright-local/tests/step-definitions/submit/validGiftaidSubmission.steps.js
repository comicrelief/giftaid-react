const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

When('I submit the local Giftaid form and wait for the navigation', async function () {
  await this.page.locator(selectors.formFields.submitButton).click();
  await expect(this.page.locator(selectors.success.heading)).toContainText('Thank you,');
});
