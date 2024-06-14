// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test('Accessing giftaid update sorry page should show the sorry message @sanity @nightly-sanity', async ({ page }) => {
  // Navigate to the 'Sorry' page of giftaid update form
  await page.goto(`${process.env.BASE_URL}update/sorry`, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Check for the 'Sorry' message header
  const headerText = await page.locator('div > h1').textContent();
  expect(headerText).toContain('Sorry!');
  
  // Verify the sorry message
  const sorryMessage = await page.locator('div > div > p:nth-child(1)').isVisible();
  expect(sorryMessage).toBeTruthy();
  
  await page.close();
});
