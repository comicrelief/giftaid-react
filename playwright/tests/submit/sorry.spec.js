// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test.describe('Sorry page @sanity', () => {

  test('accessing giftaid sorry page should show the sorry message', async ({ page }) => {

    await page.goto(process.env.BASE_URL + 'sorry', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('div > h1');

    await expect(page.locator('div > h1')).toContainText('Sorry!');

    await expect(page.locator('div > div > p:nth-child(1)')).toBeVisible();

    await page.close();
  });
});
