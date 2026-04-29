// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { selectors } = require('../utils/locators');

test.describe('International addresses validation @sanity @nightly-sanity', () => {
  test('selecting a non-UK country and entering a non-UK postcode should submit the form', async ({ page }) => {
    const commands = new Commands(page);
  
    // Navigate to the giftaid page
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    
    // Click to activate the form and fill in default values
    await page.click(selectors.giftaid.option);
    await page.fill(selectors.formFields.mobile, '07123456789');
    await page.fill(selectors.formFields.firstName, 'test');
    await page.fill(selectors.formFields.lastName, 'user');
    await page.fill(selectors.formFields.postcode, '30916-395'); // Non-UK postcode
    
    // Verify error message for UK postcode requirement
    await expect(page.locator(selectors.errorMessages.postcode)).toContainText(
      'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    // Fill in address details
    await page.click(selectors.address.manualAddressLink);
    await page.fill(selectors.address.address1, '219 Beacon St');
    await page.fill(selectors.address.address2, 'Winder');
    await page.fill(selectors.address.town, 'GA');
  
    // Select a random non-UK country
    const countries = await page.$$eval(selectors.address.countryOptions, options =>
      options
        .map(option => option.value)
        .filter(value => value && value !== 'GB')
    );
  
    const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
    await page.selectOption(selectors.address.countryByName, { value: randomCountryCode });
    
    // Verify that postcode error is resolved after country change
    await expect(page.locator(selectors.errorMessages.postcode)).not.toBeVisible();
    
    // Submit the form and ensure no errors are shown for international address
    await commands.selectMarketingPrefs(page);
  
    await Promise.all([
      page.waitForNavigation(),
      page.click(selectors.formFields.submitButton),
    ]);
  
    await expect(page.locator(selectors.success.heading)).toContainText('Thank you, test!');
    
    await page.close();
  });
});
