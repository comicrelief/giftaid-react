// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Address validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // fill in all input fields
    await page.locator('#field-input--mobile').fill('07123456789');
    await page.locator('input#field-input--firstname').fill('test');
    await page.locator('input#field-input--lastname').fill('user');
  });

  test.skip('empty postcode should show error message', async ({ page }) => {

    // empty postcode should show error message
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    // clear postcode
    await page.locator('input#field-input--postcode').fill('');

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter your postcode');

    await page.close();
  });

  test.skip('invalid postcodes should show error messages', async ({ page }) => {

    // postcode starting with numbers should show error message
    await page.locator('input#field-input--postcode').fill('12SE17TP');

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');

    // postcode with invalid input should show error message
    await page.locator('input#field-input--postcode').fill('');
    await page.locator('input#field-input--postcode').fill('comic relief');
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');
    await page.close();
  });

  test.skip('enter postcode but submit without selecting address should show error message', async ({ page }) => {

    // enter postcode
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    // click on postcode lookup button
    await page.locator('#postcode_button').click();
    await expect(page.locator('#field-select--addressSelect')).toBeVisible();

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div#field-error--addressSelect > span')).toContainText('Please select your address');

    await page.close();
  });

  test.skip('clicking on manual address link should show address fields', async ({ page }) => {

    // enter postcode
    await page.locator('input#field-input--postcode').fill('SE1 7TP');

    await expect(page.locator('a[aria-describedby=field-error--addressDetails]')).toBeVisible();

    // clicking on manual address link
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();

    await expect(page.locator('#field-input--address1')).toBeVisible();
    await expect(page.locator('#field-input--address2')).toBeVisible();
    await expect(page.locator('#field-input--address3')).toBeVisible();
    await expect(page.locator('#field-input--town')).toBeVisible();
    await expect(page.locator('select#field-select--country')).toBeVisible();

    await page.close();
  });

  test.skip('validate address fields', async ({ page }) => {

    // enter postcode
    await page.locator('input#field-input--postcode').fill('SE1 7TP');

    await expect(page.locator('a[aria-describedby=field-error--addressDetails]')).toBeVisible();

    // clicking on manual address link
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();

    // empty address line 1 should show error message
    await expect(page.locator('#field-input--address1')).toBeVisible();
    await page.locator('#field-input--address1').type('Comic Relief');
    await page.locator('#field-input--address1').fill('');
    await expect(page.locator('#field-error--address1 > span')).toContainText('Please fill in your address line 1');

    // address line 1 with special characters should show error message
    await page.locator('#field-input--address1').fill('');
    await page.locator('#field-input--address1').fill('@£%3dComic Relief');
    await expect(page.locator('#field-error--address1 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // address line 1 starting with space should show error message
    await page.locator('#field-input--address1').fill('');
    await page.locator('#field-input--address1').fill('  Comic Relief');
    await expect(page.locator('#field-error--address1 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // empty address line 2 should show error message
    await expect(page.locator('#field-input--address2')).toBeVisible();
    await page.locator('#field-input--address2').type('Comic Relief');
    await page.locator('#field-input--address2').fill('');
    await expect(page.locator('#field-error--address2 > span')).toBeHidden();

    // address line 2 with special characters should show error message
    await page.locator('#field-input--address2').fill('');
    await page.locator('#field-input--address2').fill('@£%3dComic Relief');
    await expect(page.locator('#field-error--address2 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // address line 2 starting with space should show error message
    await page.locator('#field-input--address2').fill('');
    await page.locator('#field-input--address2').fill('  Comic Relief');
    await expect(page.locator('#field-error--address2 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // empty address line 3 should show error message
    await expect(page.locator('#field-input--address3')).toBeVisible();
    await page.locator('#field-input--address3').type('Comic Relief');
    await page.locator('#field-input--address3').fill('');
    await expect(page.locator('#field-error--address3 > span')).toBeHidden();

    // address line 3 with special characters should show error message
    await page.locator('#field-input--address3').fill('');
    await page.locator('#field-input--address3').fill('@£%3dComic Relief');
    await expect(page.locator('#field-error--address2 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // address line 3 starting with space should show error message
    await page.locator('#field-input--address3').fill('');
    await page.locator('#field-input--address3').fill('  Comic Relief');
    await expect(page.locator('#field-error--address3 > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // empty town field should show error message
    await expect(page.locator('#field-input--town')).toBeVisible();
    await page.locator('input#field-input--town').type('London');
    await page.locator('input#field-input--town').fill('');
    await expect(page.locator('#field-error--town > span')).toContainText('Please fill in your town/city');

    // town field with special characters should show error message
    await page.locator('input#field-input--town').fill('');
    await page.locator('input#field-input--town').fill('@£%3dComic Relief');
    await expect(page.locator('#field-error--town > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    // town field starting with space should show error message
    await page.locator('input#field-input--town').fill('');
    await page.locator('input#field-input--town').fill('  Comic Relief');
    await expect(page.locator('#field-error--town > span')).toContainText('This field only accepts alphanumeric characters and \' . - & _ /');

    await page.close();
  });
});
