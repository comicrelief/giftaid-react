// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { selectors } = require('../utils/locators');

test.only('Valid giftaid update submission @sanity @nightly-sanity', async ({ page }) => {
  const commands = new Commands(page);
  
  // Navigate to the Giftaid update page
  await page.goto(`${process.env.BASE_URL}update`, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  
  // Populate all input fields with valid data
  await commands.populateUpdateFormFields(page);
  
  // Select 'Yes' for GiftAid declaration
  await page.locator(selectors.giftAidClaimChoice.yes).click();
  
  // Submit the form and validate the thank you message
  await page.locator(selectors.formFields.submitButton).click();
  await expect(page.locator(selectors.success.heading)).toContainText('Thank you, test!');
  
  await page.close();
});
