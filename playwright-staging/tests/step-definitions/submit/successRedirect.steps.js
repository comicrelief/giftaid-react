const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { selectors } = require('../../utils/locators');

Given('I navigate to the Giftaid success page', async function () {
  await this.page.goto(`${process.env.BASE_URL}success`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

Then('I should be redirected to the Giftaid homepage', async function () {
  const header = this.page.locator(selectors.homepage.heading);
  await expect(header).toBeVisible();
  await expect(header).toContainText('Giftaid it');
});

Then('I should see the Giftaid heading', async function () {
  await expect(this.page.locator(selectors.homepage.heading)).toBeVisible();
});

Then('I should see the Giftaid option', async function () {
  await expect(this.page.locator(selectors.giftaid.option)).toBeVisible();
});

Then('I should see the mobile input field', async function () {
  await expect(this.page.locator(selectors.formFields.mobile)).toBeVisible();
});
