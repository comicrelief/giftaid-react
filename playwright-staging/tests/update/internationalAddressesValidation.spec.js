// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { v4: uuidv4 } = require('uuid');

test.describe('International addresses validation on update form @sanity @nightly-sanity', () => {
  test('selecting a non-UK country and entering a non-UK postcode should submit the update form', async ({ page }) => {
    
    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.locator('.form__radio input[type="radio"][value="call centre"]').click();
    
    // fill in all input fields
    // await page.locator('input#field-input--transactionId').fill(transactionId);
    await page.locator('#field-input--firstname').fill('test');
    await page.locator('#field-input--lastname').fill('test lastname');
    await page.locator('input#field-input--email').fill('giftaid-staging-@email.sls.comicrelief.com');
    
    // enter a non-UK postcode and attempt to validate it
    await page.locator('input#field-input--postcode').fill('30916-395');
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    // manually enter international address details
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await page.locator('#field-input--address1').fill('219 Beacon St');
    await page.locator('#field-input--address2').fill('Winder');
    await page.locator('#field-input--address3').fill('Park Ridge');
    await page.locator('#field-input--town').fill('GA');
    
    // Select a random country from the dropdown (excluding UK to simulate international address)
    const countryOptions = await page.$$eval('select#field-select--country>option', options =>
      options.map(option => option.value).filter(value => value !== 'GB')
    );
    const randomCountryCode = countryOptions[Math.floor(Math.random() * countryOptions.length)];
    await page.locator('select[name="country"]').selectOption({ value: randomCountryCode });
    
    // Wait for the form to adjust to the selected country
    await page.waitForTimeout(2000);
    
    // When an international country is selected, the postcode error for UK format should not show anymore
    await expect(page.locator('div#field-error--postcode > span')).not.toBeVisible();
    
    // Select yes for giftaid declaration to complete the form
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
    
    // Submitting the form with valid international details
    await page.locator('button[type=submit]').click();
    
    // Thank you message on success page
    await expect(page.locator('div > h1')).toContainText('Thank you, test!');
    
    await page.close();
  });
});
