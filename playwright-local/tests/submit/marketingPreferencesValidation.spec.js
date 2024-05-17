// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

const Chance = require('chance');
const chance = new Chance();

const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;
const phone = chance.phone({ country: 'uk', mobile: true }).replace(/\s/g, '');

test.describe('Marketing preferences validation', () => {

  test.beforeEach(async ({ page }) => {

    const commands = new Commands(page);
    await page.goto('/', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.click('#field-label--giftaid');
    await commands.populateFormFields(page);
  });
  
  test('clicking and unclicking marketing prefs options should submit the giftaid form', async ({ page }) => {
    // Interact with marketing preferences
    const marketingOptions = ['[aria-label="field-label--Email--Email"]', '[aria-label="field-label--Phone--Phone"]', '[aria-label="field-label--Text--SMS"]'];
    for (const option of marketingOptions) {
      await page.click(option);
      expect(await page.locator(option).isChecked()).toBeTruthy();
    }
    
    // Enter email and phone to validate the form can still submit
    await expect(page.locator('input#field-input--email')).toBeVisible();
    await page.fill('input#field-input--email', email);
    await expect(page.locator('input#field-input--phone')).toBeVisible();
    await page.fill('input#field-input--phone', phone);
    
    // Submit the form
    await page.click('button[type=submit]');
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
  
  test('Validate email marketing preference field', async ({ page }) => {
    await page.click('[aria-label="field-label--Email--Email"]');
    await page.fill('input#field-input--email', email);
    
    // Clear and check for error
    await page.fill('input#field-input--email', '');
    await expect(page.locator('#field-error--email')).toHaveText('Please fill in your email address');
    
    // Input invalid email and check for error
    await page.fill('input#field-input--email', 'example@£$^&email.com');
    await expect(page.locator('#field-error--email')).toHaveText('Please fill in a valid email address');
    
    // Re-enter valid email and submit
    await page.fill('input#field-input--email', email);
    await page.click('button[type=submit]');
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
  
  test('Validate phone marketing preference field', async ({ page }) => {
    await page.click('[aria-label="field-label--Phone--Phone"]');
    await page.fill('input#field-input--phone', phone);
    
    // Clear and check for error
    await page.fill('input#field-input--phone', '');
    await expect(page.locator('div#field-error--phone > span')).toHaveText('Please fill in your phone number');
    
    // Input invalid phone number and check for error
    await page.fill('input#field-input--phone', '0208569424');
    await expect(page.locator('div#field-error--phone > span')).toHaveText('Please fill in a valid UK phone number, with no spaces');
    
    // Re-enter valid phone number and submit
    await page.fill('input#field-input--phone', phone);
    await page.click('button[type=submit]');
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
});
