// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test('Accessing success page should redirect to giftaid homepage @sanity @nightly-sanity', async ({ page }) => {
  // Navigate directly to the success page and expect a redirect
  await page.goto(`${process.env.BASE_URL}success`, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Check if the expected header title is present, which indicates a successful redirect
  const headerTitle = page.locator('h1.giftaid-title');
  await expect(headerTitle).toBeVisible();
  await expect(headerTitle).toContainText('Giftaid it');
  
  // Verify the presence of key elements on the redirected homepage
  await expect(page.locator('#field-label--giftaid')).toBeVisible();
  await expect(page.locator('#field-input--mobile')).toBeVisible();
  
  await page.close();
});
