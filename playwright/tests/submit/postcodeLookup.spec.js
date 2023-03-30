// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');

test.describe('Postcode validation @sanity', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL, { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // fill in all input fields
    await page.locator('#field-input--mobile').fill('07123456789');
    await page.locator('input#field-input--firstname').fill('test');
    await page.locator('input#field-input--lastname').fill('user');
  });

  test('postcode entered with extra spaces should show error message', async ({ page }) => {

    await page.locator('input#field-input--postcode').type('S E 1 7 T P');

    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');

    await page.close();
  });

  test('postcode entered in lowercase should show error message', async ({ page }) => {

    await page.locator('input#field-input--postcode').type('se17tp');

    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');

    await page.close();
  });

  test('postcode entered with no spaces should show error message', async ({ page }) => {

    await page.locator('input#field-input--postcode').type('SE17TP');

    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');

    await page.close();
  });

  test('postcode entered with special characters should show error message', async ({ page }) => {

    await page.locator('input#field-input--postcode').type('SE$%TP');

    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();

    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space and capital letters');

    await page.close();
  });

  test('enter valid UK postcode using postcode lookup should be able to submit the form', async ({ page }) => {

    // enter postcode
    await page.locator('input#field-input--postcode').fill('SE1 7TP');
    // click on postcode lookup button
    await page.locator('#postcode_button').click();

    if (await page.locator('#field-select--addressSelect').isVisible()) {
      console.log('postcode lookup address dropdown present select the address');

      await expect(page.locator('#field-select--addressSelect')).toBeVisible();

      await page.waitForSelector('select#field-select--addressSelect');

      const optionToSelect = await page.locator('option', { hasText: 'COMIC RELIEF, CAMELFORD HOUSE 87-90' }).textContent();
      console.log('selected option: ', optionToSelect);

      // Use option text to select
      await page.locator('select#field-select--addressSelect').selectOption({ label: optionToSelect });

      // expect pre-enetered se17tp postcode to change to SE1 7TP when address is selected by removing the extra spaces
      await expect(page.locator('input#field-input--postcode')).toHaveValue('SE1 7TP');

      const addressLine1 = await page.evaluate(() => document.querySelector('#field-input--address1').getAttribute('value'));
      console.log('Address line 1 field value is : ', addressLine1);

      const addressLine2 = await page.evaluate(() => document.querySelector('#field-input--address2').getAttribute('value'));
      console.log('Address line 1 field value is : ', addressLine2);

      const addressLine3 = await page.evaluate(() => document.querySelector('#field-input--address3').getAttribute('value'));
      console.log('Address line 1 field value is : ', addressLine3);

      const town = await page.evaluate(() => document.querySelector('input#field-input--town').getAttribute('value'));
      console.log('Address line 1 field value is : ', town);

      // clicking on submit button should show error on address lookup
      await page.locator('button[type=submit]').click();

      await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
        'test!');
    } else {

      // click on manual address link
      await page.locator('a[aria-describedby=field-error--addressDetails]').click();
      await page.locator('#field-input--address1').type('COMIC RELIEF');
      await page.locator('#field-input--address2').type('CAMELFORD HOUSE 87-90');
      await page.locator('#field-input--address2').type('ALBERT EMBANKMENT');
      await page.locator('#field-input--town').type('LONDON');
      // clicking on submit button should show error on address lookup
      await page.locator('button[type=submit]').click();

      await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
        'test!');
    }
    await page.close();
  });
});
