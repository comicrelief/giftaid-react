const { Given } = require('@cucumber/cucumber');

Given('I navigate to the Giftaid update success page', async function () {
  // Navigate to the success page of the Giftaid update directly
  await this.page.goto(`${process.env.BASE_URL}update/success`, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});
