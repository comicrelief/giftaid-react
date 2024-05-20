// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test('Accessing giftaid sorry page should show the sorry message @sanity @nightly-sanity', async ({ page }) => {
  // Go directly to the "sorry" page appended to the base URL
  await page.goto(`${process.env.BASE_URL}sorry`, { timeout: 30000 });
  
  // Wait for the main header to be loaded and visible on the page
  const header = page.locator('div > h1');
  await expect(header).toBeVisible();
  await expect(header).toContainText('Sorry!');
  
  // Verify that the first paragraph under the div > div is visible
  const firstParagraph = page.locator('div > div > p:nth-child(1)');
  await expect(firstParagraph).toBeVisible();
  
  await page.close();
});
