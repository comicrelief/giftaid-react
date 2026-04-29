// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { selectors } = require('../utils/locators');

const Chance = require('chance');
const chance = new Chance();

const email = `giftaid-update-staging-${chance.email()}`;
const phone = chance.phone({ country: 'uk', mobile: false }).replace(/\s/g, '');

test.describe('Marketing preferences validation @sanity @nightly-sanity', () => {
  
  test.beforeEach(async ({ page }) => {
    const commands = new Commands(page);
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.click(selectors.giftaid.option);
    await commands.populateFormFields(page);
  });
  
  test('clicking and unclicking marketing prefs options should submit the giftaid form', async ({ page }) => {
    // Interact with marketing preferences
    const marketingOptions = [
      selectors.marketingPreferences.options.email,
      selectors.marketingPreferences.options.phone,
      selectors.marketingPreferences.options.text,
    ];
    
    for (const option of marketingOptions) {
      await page.click(option);
      expect(await page.locator(option).isChecked()).toBeTruthy();
    }
    
    // Enter email and phone to validate the form can still submit
    await expect(page.locator(selectors.marketingPreferences.fields.email)).toBeVisible();
    await page.fill(selectors.marketingPreferences.fields.email, email);
    await expect(page.locator(selectors.marketingPreferences.fields.phone)).toBeVisible();
    await page.fill(selectors.marketingPreferences.fields.phone, phone);
    
    // Submit the form
    await page.click(selectors.formFields.submitButton);
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you, test!');
  });
  
  test('Validate email marketing preference field', async ({ page }) => {
    await page.click(selectors.marketingPreferences.options.email);
    await page.fill(selectors.marketingPreferences.fields.email, email);
    
    // Clear and check for error
    await page.fill(selectors.marketingPreferences.fields.email, '');
    await expect(page.locator(selectors.errorMessages.email)).toHaveText('Please fill in your email address');
    
    // Input invalid email and check for error
    await page.fill(selectors.marketingPreferences.fields.email, 'example@£$^&email.com');
    await expect(page.locator(selectors.errorMessages.email)).toHaveText('Please fill in a valid email address');
    
    // Re-enter valid email and submit
    await page.fill(selectors.marketingPreferences.fields.email, email);
    await page.click(selectors.formFields.submitButton);
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you, test!');
  });
  
  test('Validate phone marketing preference field', async ({ page }) => {
    await page.click(selectors.marketingPreferences.options.phone);
    await page.fill(selectors.marketingPreferences.fields.phone, phone);
    
    // Clear and check for error
    await page.fill(selectors.marketingPreferences.fields.phone, '');
    await expect(page.locator(selectors.errorMessages.phone)).toHaveText('Please fill in your phone number');
    
    // Input invalid phone number and check for error
    await page.fill(selectors.marketingPreferences.fields.phone, '0208569424');
    await expect(page.locator(selectors.errorMessages.phone)).toHaveText('Please fill in a valid UK phone number, with no spaces');
    
    // Re-enter valid phone number and submit
    await page.fill(selectors.marketingPreferences.fields.phone, phone);
    await page.click(selectors.formFields.submitButton);
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you, test!');
  });
});
