// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

test('Valid giftaid submission', async ({ page }) => {

  const commands = new Commands(page);

  await page.goto('/', { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');

  // Ensure the transaction ID input is visible
  await expect(page.locator('input#field-input--transactionId')).toBeVisible();

  // Populate all input fields with valid data
  await commands.populateUpdateFormFields(page);

  // Select 'Yes' for GiftAid declaration
  await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

  // Submit the form and validate the thank you message
  await page.locator('button[type=submit]').click();
  await expect(page.locator('div > h1')).toContainText('Thank you, test!');

  await page.close();
});
