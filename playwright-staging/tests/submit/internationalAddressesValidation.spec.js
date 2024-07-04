// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test.describe('International addresses validation @sanity @nightly-sanity', () => {
  test('selecting a non-UK country and entering a non-UK postcode should submit the form', async ({ page }) => {
    const commands = new Commands(page);
  
    // Navigate to the giftaid page
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    
    // Click to activate the form and fill in default values
    await page.click('#field-label--giftaid');
    await page.fill('#field-input--mobile', '07123456789');
    await page.fill('input#field-input--firstname', 'test');
    await page.fill('input#field-input--lastname', 'user');
    await page.fill('input#field-input--postcode', '30916-395');  // Non-UK postcode
    
    // Verify error message for UK postcode requirement
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    // Fill in address details
    await page.click('a[aria-describedby=field-error--addressDetails]');
    await page.fill('#field-input--address1', '219 Beacon St');
    await page.fill('#field-input--address2', 'Winder');
    await page.fill('input#field-input--town', 'GA');
    
    // Select a random non-UK country
    const countries = await page.$$eval('select#field-select--country > option', options => options.map(option => option.value));
    const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
    await page.selectOption('select[name="country"]', { value: randomCountryCode });
    
    // Verify that postcode error is resolved after country change
    await expect(page.locator('div#field-error--postcode > span')).not.toBeVisible();
    
    // Submit the form and ensure no errors are shown for international address
    await commands.selectMarketingPrefs(page); // Assuming this handles checkbox interactions
    await page.click('button[type=submit]');
    await expect(page.locator('div.success-wrapper--inner h1')).toContainText('Thank you, test!');
    
    await page.close();
  });
});
