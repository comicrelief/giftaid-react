// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');

test.describe('Form validation @sanity @nightly-sanity', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the giftaid page
    await page.goto(process.env.BASE_URL, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#field-label--giftaid').click();
  });
  
  test('Validate mobile number field', async ({ page }) => {
    const commands = new Commands(page);
    
    // Test cases for various mobile number validations
    const mobileTestCases = [
      { input: '0712345678', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0712345678900', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0712 345 6789', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0780ab5694245', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
    ];
    
    for (let testCase of mobileTestCases) {
      await page.locator('#field-input--mobile').fill(''); // Clear the field before each test
      await page.locator('#field-input--mobile').type(testCase.input, { delay: 100 });
      await expect(page.locator('div#field-error--mobile > span')).toHaveText(testCase.error);
    }
    
    // Validate correct mobile number
    await page.locator('#field-input--mobile').fill(''); // Ensure the field is cleared and filled with valid data
    await commands.populateFormFields(page, { mobile: '07123456789' });
    await page.locator('button[type=submit]').click();
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
  
  test('validate first name field', async ({ page }) => {
    const commands = new Commands(page);
    
    // First name with invalid characters
    await page.locator('#field-input--firstname').fill('Test^$%£');
    await expect(page.locator('div#field-error--firstname')).toHaveText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');
    
    // First name with just a space
    await page.locator('#field-input--firstname').fill(' ');
    await expect(page.locator('div#field-error--firstname')).toHaveText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');
    
    // First name with alphanumeric characters
    await page.locator('#field-input--firstname').fill('123Test');
    await expect(page.locator('div#field-error--firstname')).toHaveText('This field only accepts 25 alphabetic characters and \' - starting with alphabetic characters');
    
    // Validate correct first name
    await page.locator('#field-input--firstname').fill('');
    await commands.populateFormFields(page, { firstName: 'testFirstname' });
    await page.locator('button[type=submit]').click();
    await expect(page.locator('div > h1')).toHaveText('Thank you, testFirstname!');
  });
  
  test('validate last name field', async ({ page }) => {
    const commands = new Commands(page);
    
    // Last name with invalid characters
    await page.locator('#field-input--lastname').fill('Test^$%£');
    await expect(page.locator('div#field-error--lastname > span')).toHaveText('This field only accepts 25 alphanumeric characters and , . ( ) / & \' - starting with alphanumeric characters');
    
    // Last name with just a space
    await page.locator('#field-input--lastname').fill(' ');
    await expect(page.locator('div#field-error--lastname > span')).toHaveText('This field only accepts 25 alphanumeric characters and , . ( ) / & \' - starting with alphanumeric characters');
    
    // Last name with alphanumeric characters (valid case)
    await page.locator('#field-input--lastname').fill('123Test');
    expect(await page.locator('div#field-error--lastname > span').count()).toEqual(0);
    
    // Validate correct last name
    await page.locator('#field-input--lastname').fill('');
    await commands.populateFormFields(page);
    await page.locator('button[type=submit]').click();
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
});
