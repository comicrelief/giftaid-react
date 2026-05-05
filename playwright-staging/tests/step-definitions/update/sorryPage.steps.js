const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I navigate to the Giftaid update sorry page', async function () {
  // Navigate to the 'Sorry' page of giftaid update form
  await this.page.goto(`${process.env.BASE_URL}update/sorry`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

Then('I should see the update sorry heading', async function () {
  await expect(this.page.locator(selectors.sorry.heading)).toContainText('Sorry!');
});

Then('I should see the update sorry message', async function () {
  const sorryMessage = await this.page.locator(selectors.sorry.firstParagraph).isVisible();
  expect(sorryMessage).toBeTruthy();
});
