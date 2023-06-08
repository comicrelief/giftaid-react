// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

test.describe('Address validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

  });

  test.skip('clearing input fields should show error messages', async ({ page }) => {
    // empty phone number field
    await page.locator('#field-input--mobile').fill('07123456789');
    await page.locator('#field-input--mobile').fill('');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please fill in your mobile number');

    // empty first name field
    await page.locator('input#field-input--firstname').fill('test');
    // clear firstname
    await page.locator('input#field-input--firstname').fill('');
    await expect(page.locator('div#field-error--firstname > span')).toContainText('Please fill in your first name');

    // empty lastname field
    await page.locator('input#field-input--lastname').fill('user');
    // clear lastname
    await page.locator('input#field-input--lastname').fill('');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('Please fill in your last name');

    // empty postcode field
    await page.locator('input#field-input--postcode').fill('SE17TP');
    // clear postcode
    await page.locator('input#field-input--postcode').fill('');
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter your postcode');

    await page.close();
  });

  test.skip('validate mobile number field', async ({ page }) => {

    const commands = new Commands(page);

    await page.locator('#field-input--mobile').fill('07123456789');
    await page.locator('#field-input--mobile').fill('');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please fill in your mobile number');

    // mobile number less than 11 digits shows error message
    await page.locator('input#field-input--mobile').type('0712345678', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // mobile number more than 11 digits shows error message
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field
    await page.locator('input#field-input--mobile').type('0712345678900', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // mobile number with spaces should show error
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field
    await page.locator('input#field-input--mobile').type('0712 345 6789', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // mobile number with alphabetical chars should show error
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field
    await page.locator('input#field-input--mobile').type('0780ab5694245', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // mobile number starting with alphabetical chars should show error
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field
    await page.locator('input#field-input--mobile').type('abcv07805694245', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // mobile number ending with alphabetical chars should show error
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field
    await page.locator('input#field-input--mobile').type('07805694245dfef', {delay: 100});
    await page.waitForSelector('div#field-error--mobile > span');
    await expect(page.locator('div#field-error--mobile > span')).toContainText('Please enter a valid mobile phone number - it must be the same number associated with your donation.');

    // clear the mobile number field
    await page.locator('input#field-input--mobile').fill(''); // clear the mobile number field

    // entering valid input fields should be able to submit the form
    await commands.populateFormFields();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });

  test.skip('validate first name field', async ({ page }) => {

    const commands = new Commands(page);

    await page.locator('#field-input--firstname').fill('test');
    await page.locator('#field-input--firstname').fill('');
    await expect(page.locator('#field-error--firstname')).toContainText('Please fill in your first name');

    // enter firstname field with special chars should show error message
    await page.locator('#field-input--firstname').type('Test^$%£');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');

    // firstname with just a space should show error message
    await page.keyboard.press('Backspace');
    await page.locator('#field-input--firstname').type(' ');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');

    // firstname with a mixture of alphanumeric chars should show error message
    await page.locator('#field-input--firstname').fill(''); // clear the first-name field
    await page.locator('#field-input--firstname').type('123Test');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');

    // clear the first name field
    await page.locator('#field-input--firstname').fill('');

    // entering valid input fields should be able to submit the form
    await commands.populateFormFields();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });

  test('validate last name field', async ({ page }) => {

    const commands = new Commands(page);

    await page.locator('#field-input--lastname').fill('test lastname');
    await page.locator('#field-input--lastname').fill('');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('Please fill in your last name');

    // enter lastname field with special chars should show error message
    await page.locator('#field-input--lastname').type('Test^$%£');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('This field only accepts 25 alphanumeric characters and , . ( ) / & \' - starting with alphanumeric characters');

    // lastname with just a space should show error message
    await page.keyboard.press('Backspace');
    await page.locator('#field-input--lastname').type(' ');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('This field only accepts 25 alphanumeric characters and , . ( ) / & \' - starting with alphanumeric characters');

    // lastname with a mixture of alphanumeric chars should not show error message
    await page.locator('#field-input--lastname').fill(''); // clear the last-name field
    await page.locator('#field-input--lastname').type('123Test');
    // should not show error message
    expect(await page.locator('div#field-error--lastname > span').count()).toEqual(0);

    // clear the last name field
    await page.locator('#field-input--lastname').fill('');

    // entering valid input fields should be able to submit the form
    await commands.populateFormFields();

    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });
});
