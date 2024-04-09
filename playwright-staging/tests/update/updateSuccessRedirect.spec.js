// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test.describe('Success page redirect @sanity @nightly-sanity', () => {

  test('accessing success page should redirect to giftaid update homepage', async ({ page }) => {

    await page.goto(process.env.BASE_URL + 'update/success', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('h1[class=giftaid-title]');

    await expect(page.locator('h1[class=giftaid-title]')).toContainText('Giftaid it');

    await expect(page.locator('input#field-input--firstname')).toBeVisible();

    await page.close();
  });
});
