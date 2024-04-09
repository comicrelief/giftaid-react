// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test.describe('Valid giftaid update submission @sanity @nightly-sanity', () => {

  test('submit giftaid update form with valid inputs', async ({ page }) => {

    const commands = new Commands(page);

    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('input#field-input--firstname')).toBeVisible();

    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields();

    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });
});

