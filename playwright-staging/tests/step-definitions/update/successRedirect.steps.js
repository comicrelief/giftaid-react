const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I navigate to the Giftaid update success page', async function () {
  // Navigate to the success page of the Giftaid update directly
  await this.page.goto(`${process.env.BASE_URL}update/success`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

Then('I should be redirected to the Giftaid homepage', async function () {
  // Confirm the page has the expected Giftaid title after redirection
  await expect(this.page.locator(selectors.homepage.heading)).toContainText('Giftaid it');
});
