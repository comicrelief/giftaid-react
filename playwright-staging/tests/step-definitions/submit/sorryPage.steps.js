const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I navigate to the Giftaid sorry page', async function () {
  await this.page.goto(`${process.env.BASE_URL}sorry`, { timeout: 30000 });
});

Then('I should see the sorry heading', async function () {
  const header = this.page.locator(selectors.sorry.heading);
  await expect(header).toBeVisible();
  await expect(header).toContainText('Sorry!');
});

Then('I should see the sorry message paragraph', async function () {
  const firstParagraph = this.page.locator(selectors.sorry.firstParagraph);
  await expect(firstParagraph).toBeVisible();
});
