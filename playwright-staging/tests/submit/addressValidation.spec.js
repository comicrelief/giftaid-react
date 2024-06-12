// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test.describe('Address validation @sanity @nightly-sanity', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the giftaid page
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#field-label--giftaid').click();
    await page.locator('#field-input--mobile').fill('07123456789');
    await page.locator('input#field-input--firstname').fill('test');
    await page.locator('input#field-input--lastname').fill('user');
  });
  
  test('empty postcode should show error message', async ({ page }) => {
    await page.locator('input#field-input--postcode').fill('');
    await page.locator('button[type=submit]').click();
    await expect(page.locator('div#field-error--postcode > span')).toHaveText('Please enter your postcode');
    await page.close();
  });
  
  test('invalid postcodes should show error messages', async ({ page }) => {
    await page.locator('input#field-input--postcode').fill('12SE17TP');
    await expect(page.locator('div#field-error--postcode > span')).toHaveText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    await page.locator('input#field-input--postcode').fill('comic relief');
    await expect(page.locator('div#field-error--postcode > span')).toHaveText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    await page.close();
  });
  
  test('enter postcode but submit without selecting address should show error message', async ({ page }) => {
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    await page.locator('#postcode_button').click();
    await expect(page.locator('#field-select--addressSelect')).toBeVisible();
    await page.locator('button[type=submit]').click();
    await expect(page.locator('div#field-error--addressSelect > span')).toHaveText('Please select your address');
    await page.close();
  });
  
  test('clicking on manual address link should show address fields', async ({ page }) => {
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    await expect(page.locator('a[aria-describedby=field-error--addressDetails]')).toBeVisible();
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await expect(page.locator('#field-input--address1')).toBeVisible();
    await expect(page.locator('#field-input--address2')).toBeVisible();
    await expect(page.locator('#field-input--address3')).toBeVisible();
    await expect(page.locator('#field-input--town')).toBeVisible();
    await expect(page.locator('select#field-select--country')).toBeVisible();
    await page.close();
  });
  
  test('validate address fields', async ({ page }) => {
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    
    // Should see error message for address1 when inout with special characters is entered
    await page.locator('#field-input--address1').fill('@£%3dComic Relief');
    await expect(page.locator('#field-error--address1 > span')).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
    await page.locator('#field-input--town').fill('  Comic Relief');
    await expect(page.locator('#field-error--town > span')).toHaveText("This field only accepts alphanumeric characters and ' . - & _ /");
    
    await page.close();
  });
});
