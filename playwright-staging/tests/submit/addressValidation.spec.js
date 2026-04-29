// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { selectors } = require('../utils/locators');

test.describe('Address validation @sanity @nightly-sanity', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the giftaid page
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.locator(selectors.giftaid.option).click();
    await page.locator(selectors.formFields.mobile).fill('07123456789');
    await page.locator(selectors.formFields.firstName).fill('test');
    await page.locator(selectors.formFields.lastName).fill('user');
  });

  test('empty postcode should show error message', async ({ page }) => {
    await page.locator(selectors.formFields.postcode).fill('');
    await page.locator(selectors.formFields.submitButton).click();
    await expect(page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter your postcode');
    await page.close();
  });

  test('invalid postcodes should show error messages', async ({ page }) => {
    await page.locator(selectors.formFields.postcode).fill('12SE17TP');
    await expect(page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
  
    await page.locator(selectors.formFields.postcode).fill('comic relief');
    await expect(page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
  
    await page.locator(selectors.formFields.postcode).fill('cro 7tp');
    await expect(page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
  
    await page.close();
  });

  test('enter postcode but submit without selecting address should show error message', async ({ page }) => {
    await page.locator(selectors.formFields.postcode).fill('SE1 7TP');
    await page.locator(selectors.formFields.postcodeLookup).click();
    await expect(page.locator(selectors.address.addressSelect)).toBeVisible();
  
    await page.locator(selectors.formFields.submitButton).click();
    await expect(page.locator(selectors.errorMessages.addressSelect)).toHaveText('Please select your address');
  
    await page.close();
  });

  test('clicking on manual address link should show address fields', async ({ page }) => {
    await page.locator(selectors.formFields.postcode).fill('SE1 7TP');
    await expect(page.locator(selectors.address.manualAddressLink)).toBeVisible();
  
    await page.locator(selectors.address.manualAddressLink).click();
    await expect(page.locator(selectors.address.address1)).toBeVisible();
    await expect(page.locator(selectors.address.address2)).toBeVisible();
    await expect(page.locator(selectors.address.address3)).toBeVisible();
    await expect(page.locator(selectors.address.town)).toBeVisible();
    await expect(page.locator(selectors.address.country)).toBeVisible();
  
    await page.close();
  });

  test('validate address fields', async ({ page }) => {
    await page.locator(selectors.formFields.postcode).fill('SE1 7TP');
    await page.locator(selectors.address.manualAddressLink).click();
  
    // Should see error message for address1 when inout with special characters is entered
    await page.locator(selectors.address.address1).fill('@£%3dComic Relief');
    await expect(page.locator(selectors.errorMessages.address1)).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
  
    await page.locator(selectors.address.town).fill('  Comic Relief');
    await expect(page.locator(selectors.errorMessages.town)).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
  
    await page.close();
  });
});
