// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

const faker = require('faker');

const phone = faker.phone.phoneNumber('0208#######');
const email = `giftaid-staging-${Date.now().toString()}@email.sls.comicrelief.com`;

test.describe('Marketing preferences validation', () => {

  test.beforeEach(async ({ page }) => {

    const commands = new Commands(page);
    await page.goto('/', { timeout: 30000 });

    await page.waitForLoadState('domcontentloaded');

    await page.waitForSelector('#field-label--giftaid');
    await page.locator('#field-label--giftaid').click();

    // fill in all input fields
    await commands.populateFormFields();

  });

  test('clicking and unclicking marketing prefs options should submit the giftaid form', async ({ page }) => {

    // ticking the text and phone MP checkboxes should show the mobile number entered in step 1
    // assert MP checkeboxes is now checked
    // email
    await page.locator('#field-label--Email--Email').click();
    expect(await page.locator('#field-label--Email--Email').isChecked()).toBeTruthy();
    await expect(page.locator('input#field-input--email')).toBeVisible();
    await page.locator('input#field-input--email').type(email);

    // phone
    await page.locator('#field-label--Phone--Phone').click();
    expect(await page.locator('#field-label--Phone--Phone').isChecked()).toBeTruthy();
    await expect(page.locator('input#field-input--phone')).toBeVisible();
    await page.locator('#field-wrapper--Phone > div').type(phone);

    // post
    // await page.locator('#field-label--Post--Post').click();
    // expect(await page.locator('#field-label--Post--Post').isChecked()).toBeTruthy();

    // sms
    await page.locator('#field-label--Text--SMS').click();
    expect(await page.locator('#field-label--Text--SMS').isChecked()).toBeTruthy();

    // now unticking the MP checkboxes should still submit the form
    // untick email
    await page.locator('#field-label--Email--Email').click();
    expect(await page.locator('#field-label--Email--Email').isChecked()).toBeFalsy();

    // untick phone
    await page.locator('#field-label--Phone--Phone').click();
    expect(await page.locator('#field-label--Phone--Phone').isChecked()).toBeFalsy();

    // untick post
    // await page.locator('#field-label--Post--Post').click();
    // expect(await page.locator('#field-label--Post--Post').isChecked()).toBeFalsy();

    // untick SMS
    await page.locator('#field-label--Text--SMS').click();
    expect(await page.locator('#field-label--Text--SMS').isChecked()).toBeFalsy();

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });

  test('validate email MP field', async ({ page }) => {

    // email
    await page.locator('#field-label--Email--Email').click();
    expect(await page.locator('#field-label--Email--Email').isChecked()).toBeTruthy();
    await expect(page.locator('input#field-input--email')).toBeVisible();

    // enter valid email
    await page.locator('input#field-input--email').type(email);

    // clearing email input should show error message
    await page.locator('input#field-input--email').fill('');
    await expect(page.locator('#field-error--email')).toContainText('Please fill in your email address');

    // enter special chars before the domain should not show error message
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type('example£$^&@email.com');
    expect(await page.locator('#field-error--email').count()).toEqual(0);

    // enter email with special chars after the domain name should show error message
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type('example@£$^&email.com');
    await expect(page.locator('#field-error--email')).toContainText('Please fill in a valid email address');

    // enter valid email should submit the form
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type(email);

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });

  test('validate phone MP field', async ({ page }) => {

    // phone
    await page.locator('#field-label--Phone--Phone').click();
    expect(await page.locator('#field-label--Phone--Phone').isChecked()).toBeTruthy();
    await expect(page.locator('input#field-input--phone')).toBeVisible();

    // enter valid email
    await page.locator('input#field-input--phone').type(phone);

    // clearing email input should show error message
    await page.locator('input#field-input--phone').fill('');
    await expect(page.locator('div#field-error--phone > span')).toContainText('Please fill in your phone number');

    // phone number less than 11 digits shows error message
    await page.locator('input#field-input--phone').fill('');
    await page.locator('input#field-input--phone').type('0208569424');
    await expect(page.locator('div#field-error--phone > span')).toContainText('Please fill in a valid UK phone number, with no spaces');

    // phone number with spaces should show error
    await page.locator('input#field-input--phone').fill(''); // clear phone input fielf
    await page.locator('input#field-input--phone').type('0208 569 4245', {delay: 100});
    await page.waitForSelector('div#field-error--phone > span');
    await expect(page.locator('div#field-error--phone > span')).toContainText('Please fill in a valid UK phone number, with no spaces');
    await page.locator('input#field-input--phone').fill(''); // clear the phone number field

    // phone number with alphanumeric chars should show error
    await page.locator('input#field-input--phone').type('0208ab5694245', {delay: 100});
    await page.waitForSelector('div#field-error--phone > span');
    await expect(page.locator('div#field-error--phone > span')).toContainText('Please fill in a valid UK phone number, with no spaces');
    await page.locator('input#field-input--phone').fill(''); // clear the phone number field

    // enter valid phone number should submit the form
    await page.locator('input#field-input--phone').fill('');
    await page.locator('input#field-input--phone').type(phone);
    expect(await page.locator('#field-error--email').count()).toEqual(0);

    // clicking on submit button should show error on address lookup
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');

    await page.close();
  });
});
