// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

test('Valid giftaid submission', async ({ page }) => {

  const commands = new Commands(page);

  await page.goto('/', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Click the Giftaid checkbox
  await page.click('#field-label--giftaid');
  
  // Populate all the form fields with valid inputs
  await commands.populateFormFields(page);
  
  // Select marketing preferences as required
  await commands.selectMarketingPrefs(page);
  
  // Submit the form and wait for the navigation to ensure the submission goes through
  await Promise.all([
    page.waitForNavigation(), // This ensures that the navigation happens before the check
    page.click('button[type=submit]')
  ]);
  
  // Check for the thank you message to confirm successful submission
  await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
    'test!');
  
  await page.close();
});
