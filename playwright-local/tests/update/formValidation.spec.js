// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');
const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();

test.describe('Giftaid update form validation', () => {
  let transactionId;

  test.beforeEach(async ({ page }) => {
    transactionId = uuidv4();  // Ensure unique transaction ID for each test
  
    await page.goto('/update', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
  });
  
  test('empty input fields should show error messages', async ({ page }) => {
    // Submit the form without filling out any fields
    await page.click('button[type=submit]');
    
    // Check for the error messages associated with each field
    await expect(page.locator('div#field-error--transactionId > span')).toHaveText('Please fill in your transaction id');
    await expect(page.locator('div#field-error--firstname > span')).toHaveText('Please fill in your first name');
    await expect(page.locator('div#field-error--lastname > span')).toHaveText('Please fill in your last name');
    await expect(page.locator('div#field-error--postcode > span')).toHaveText('Please enter your postcode');
    await expect(page.locator('div#field-error--addressDetails > span')).toHaveText('Please fill in your address');
    await expect(page.locator('div#field-error--giftAidClaimChoice > span')).toHaveText('This field is required');
    await page.close();
  });
  
  test('Validate transaction ID field', async ({ page }) => {
    const commands = new Commands(page);
    
    // Test cases for various transaction ID validations
    const transactionIDTestCases = [
      { input: '', error: 'Please fill in your transaction id' },
      { input: 'ea794dc3-35f8-4a87-bc94-14125fd480@$', error: 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter' },
      { input: ' a0e9840d-b724-4868-9a68-06a86e0f0150 ', error: null } // Expects no error for valid input with spaces around it
    ];
    
    for (let testCase of transactionIDTestCases) {
      await page.fill('input#field-input--transactionId', testCase.input);
      await page.click('button[type=submit]'); // Trigger validation by attempting to submit the form
      if (testCase.error) {
        await expect(page.locator('div#field-error--transactionId > span')).toHaveText(testCase.error);
      } else {
        await expect(page.locator('div#field-error--transactionId > span')).toBeHidden();
      }
    }
    
    // Enter a valid transaction ID and submit the form to validate successful submission
    await page.fill('input#field-input--transactionId', ''); // clear the transaction field
    await commands.populateUpdateFormFields(page); // populate giftaid update form
    await page.click('#giftAidClaimChoice>div:nth-child(2)>label'); // Select yes for declaration
    await page.click('button[type=submit]'); // Submit the form
    await expect(page.locator('div > h1')).toHaveText('Thank you,  test!');
    await page.close();
  });
  
  test('Validate first name field on Giftaid update form', async ({ page }) => {
    const commands = new Commands(page);
    
    // Set up different first name test cases
    const firstNameTestCases = [
      { input: 'Test^$%£', error: "This field only accepts alphabetic characters and ' -" },  // Test for invalid characters
      { input: ' ', error: "This field only accepts alphabetic characters and ' -" },  // Test for space as input
      { input: '123Test', error: "This field only accepts alphabetic characters and ' -" }  // Test for alphanumeric input
    ];
    
    for (let testCase of firstNameTestCases) {
      await page.fill('#field-input--firstname', testCase.input);
      if (testCase.input) {
        await page.keyboard.press('Enter'); // Trigger validation by clicking submit button
      }
      await expect(page.locator('#field-error--firstname')).toHaveText(testCase.error);
    }
    
    // Test for a valid first name
    await page.fill('#field-input--firstname', ''); // clear firstname field
    await commands.populateUpdateFormFields(page, { firstName: 'John' });
    await page.click('#giftAidClaimChoice>div:nth-child(2)>label'); // Select yes for declaration
    await page.click('button[type=submit]');  // Submit the form
    
    await expect(page.locator('div > h1')).toHaveText('Thank you, John!');
    await page.close();
  });
  
  test('Validate email field on giftaid update form', async ({ page }) => {
    const commands = new Commands(page);
    
    // Set up different email test cases
    const emailTestCases = [
      { input: 'test@comic$relief.com', error: 'Please fill in a valid email address', visible: true },
      { input: 'test@c{(micrelief.com', error: 'Please fill in a valid email address', visible: true },
      { input: 'test@comic%relief.com', error: 'Please fill in a valid email address', visible: true },
      { input: 'te$%^st@comicrelief.com', error: '', visible: false },
      { input: 'Test0-9!#$%&\'*+/=?^_{|}~-@comicrelief_9-8.com.uk', error: 'Please fill in a valid email address', visible: true }
    ];
    
    for (let testCase of emailTestCases) {
      await page.fill('input#field-input--email', ''); // clear the email field before entering the test cases input
      await page.fill('input#field-input--email', testCase.input);
      await page.keyboard.press('Enter'); // Trigger validation by clicking the submit button
      if (testCase.visible) {
        await expect(page.locator('div#field-error--email > span')).toBeVisible();
        await expect(page.locator('div#field-error--email > span')).toHaveText(testCase.error);
      } else {
        await expect(page.locator('div#field-error--email > span')).not.toBeVisible();
      }
    }
    
    // Test for a valid email
    const validEmail = 'test@comicrelief.com';
    await page.fill('input#field-input--email', ''); // clear email field
    await commands.populateUpdateFormFields(page, { email: validEmail });
    await page.click('#giftAidClaimChoice>div:nth-child(3)>label'); // Select 'no' for declaration
    await page.click('button[type=submit]'); // Submit the form
    
    await expect(page.locator('div > h1')).toHaveText('Thanks for letting us know');
    await page.close();
  });
  
  test('Postcode validation and form submission', async ({ page }) => {
    // Define postcodes and expected error messages
    const postcodes = [
      { input: 'S E 1 7 T P', error: 'Please enter a valid UK postcode, using a space' },
      { input: 'se17tp', error: 'Please enter a valid UK postcode, using a space' },
      { input: 'SE17TP', error: 'Please enter a valid UK postcode, using a space' },
      { input: 'SE$%TP', error: 'Please enter a valid UK postcode, using a space' }
    ];
    
    // Test for each invalid postcode
    for (const postcode of postcodes) {
      await page.fill('input#field-input--postcode', '');
      await page.type('input#field-input--postcode', postcode.input);
      await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
      await expect(page.locator('div#field-error--postcode > span')).toHaveText(postcode.error);
    }
    
    // Test for a valid postcode and subsequent form submission
    await page.fill('input#field-input--postcode', 'SE1 7TP');
    await page.click('#postcode_button');
    
    // Checking whether address selection is available or if manual entry is needed
    if (await page.locator('#field-select--addressSelect').isVisible()) {
      // Select the first address if available
      const options = await page.$$eval('#field-select--addressSelect option', options => options.map(option => option.value));
      await page.selectOption('#field-select--addressSelect', options[1]);
      await page.click('button[type=submit]');
    } else {
      // Fallback to manual address input if no selection is available
      await page.click('a[aria-describedby=field-error--addressDetails]');
      await page.fill('#field-input--address1', 'COMIC RELIEF');
      await page.fill('#field-input--address2', 'CAMELFORD HOUSE 87-90');
      await page.fill('#field-input--address3', 'ALBERT EMBANKMENT');
      await page.fill('input#field-input--town', 'LONDON');
      await page.click('button[type=submit]');
    }
    
    await page.locator('input#field-input--transactionId').fill(transactionId);
    await page.locator('input#field-input--firstname').fill('test');
    await page.locator('input#field-input--lastname').fill(chance.last());
    await page.locator('input#field-input--email').fill(`giftaid-update-staging-${chance.email()}`);
    await page.fill('input#field-input--postcode', 'SE1 7TP');
    await page.click('#giftAidClaimChoice>div:nth-child(2)>label'); // Select yes for declaration
    await page.click('button[type=submit]'); // Submit the form
    
    await expect(page.locator('div > h1')).toHaveText('Thank you,  test!');
    await page.close();
  });
});
