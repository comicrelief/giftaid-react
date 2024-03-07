// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { v4: uuidv4 } = require('uuid');
const transactionId = uuidv4();

test.describe('International addresses validation on update form @sanity @nightly-sanity', () => {
  test('selecting a non-UK country and entering a non-UK postcode should submit the update form', async ({ page }) => {

    await page.goto(process.env.BASE_URL + 'update', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    // fill in all input fields
    await page.locator('input#field-input--transactionId').fill(transactionId);
    await page.locator('#field-input--firstname').fill('test');
    await page.locator('#field-input--lastname').fill('test lastname');
    await page.locator('input#field-input--email').fill('giftaid-staging-@email.sls.comicrelief.com');


    // enter a non-UK postcode
    await page.locator('input#field-input--postcode').fill('30916-395');

    // non-UK postcode should show error message when default UK country is selected
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space');

    await expect(page.locator('a[aria-describedby=field-error--addressDetails]')).toBeVisible();

    // clicking on manual address link
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();

    await page.locator('#field-input--address1').type('219 Beacon St');
    await page.locator('#field-input--address2').type('Winder');
    await page.locator('#field-input--address2').type('Park Ridge');
    await page.locator('#field-input--town').type('GA');

    // select random country from the country dropdown list
    // get the list of country codes
    const countryOptions = await page.$$eval('select#field-select--country>option', (els) => {
      return els.map(option => option.value)
    });

    // length of the country code list
    const randomIndex  = Math.floor(Math.random() * countryOptions.length);

    // get random country
    const countryCode = countryOptions[randomIndex];
    console.log('country code selected: ', countryCode);

    // select the random country from the dropdown
    await page.locator('select[name="country"]').selectOption({ value: countryCode });

    await page.waitForTimeout(2000);

    // get the full country name that has been selected
    const countryName = await page.$eval('select[name="country"]', sel => sel.options[sel.options.selectedIndex].textContent);
    console.log('get the selected country name: ', countryName);

    // when a international country is selected, postcode error should not show anymore
    await expect(page.locator('div#field-error--postcode > span')).not.toBeVisible();

    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await page.close();
  });
});
