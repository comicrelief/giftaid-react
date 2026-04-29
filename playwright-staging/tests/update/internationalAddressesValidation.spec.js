// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { v4: uuidv4 } = require('uuid');
const { selectors } = require('../utils/locators');

test.describe('International addresses validation on update form @sanity @nightly-sanity', () => {
  test('selecting a non-UK country and entering a non-UK postcode should submit the update form', async ({ page }) => {
    
    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    
    // fill in all input fields
    // await page.locator('input#field-input--transactionId').fill(transactionId);
    await page.locator(selectors.formFields.firstName).fill('test');
    await page.locator(selectors.formFields.lastName).fill('test lastname');
    await page.locator(selectors.marketingPreferences.fields.email).fill('giftaid-staging-@email.sls.comicrelief.com');
    
    // enter a non-UK postcode and attempt to validate it
    await page.locator(selectors.formFields.postcode).fill('30916-395');
    await expect(page.locator(selectors.errorMessages.postcode)).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    // manually enter international address details
    await page.locator(selectors.address.manualAddressLink).click();
    await page.locator(selectors.address.address1).fill('219 Beacon St');
    await page.locator(selectors.address.address2).fill('Winder');
    await page.locator(selectors.address.address3).fill('Park Ridge');
    await page.locator(selectors.address.town).fill('GA');
    
    // Select a random country from the dropdown (excluding UK to simulate international address)
    const countryOptions = await page.$$eval(selectors.address.countryOptions, options =>
      options.map(option => option.value).filter(value => value && value !== 'GB')
    );
    const randomCountryCode = countryOptions[Math.floor(Math.random() * countryOptions.length)];
    await page.locator(selectors.address.countryByName).selectOption({ value: randomCountryCode });
    
    // Wait for the form to adjust to the selected country
    await page.waitForTimeout(2000);
    
    // When an international country is selected, the postcode error for UK format should not show anymore
    await expect(page.locator(selectors.errorMessages.postcode)).not.toBeVisible();
    
    // Select yes for giftaid declaration to complete the form
    await page.locator(selectors.giftAidClaimChoice.yes).click();
    
    // Submitting the form with valid international details
    await page.locator(selectors.formFields.submitButton).click();
    
    // Thank you message on success page
    await expect(page.locator(selectors.success.heading)).toContainText('Thank you, test!');
    
    await page.close();
  });
});
