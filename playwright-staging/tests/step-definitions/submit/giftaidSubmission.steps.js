const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I am on the Giftaid page', async function () {
  await this.page.goto(process.env.BASE_URL, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

When('I select the Giftaid option', async function () {
  await this.page.click(selectors.giftaid.option);
});

Then('I should see the Giftaid thank you message', async function () {
  const expectedFirstName = this.supporter?.firstName || 'test';
  await expect(this.page.locator('h1')).toContainText(
    `Thank you, ${expectedFirstName}!`,
    { timeout: 30000 }
  );
});
