// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test.describe('Valid giftaid submission @sanity @nightly-sanity', () => {
  test('submit form with valid inputs', async ({ page }) => {

    const commands = new Commands(page);

    await page.goto(process.env.BASE_URL, { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // entering valid input fields should be able to submit the form
    await commands.populateFormFields();

    // select MP checkboxes
    await commands.selectMarketingPrefs();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');
    await page.close();
  });
});
