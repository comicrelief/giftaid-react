const { When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I submit the local Giftaid form and wait for the navigation', async function () {
  await this.page.locator('button[type=submit]').click();
  await expect(this.page.locator('div > h1')).toContainText(/Thank you,|Sorry!/);
});
