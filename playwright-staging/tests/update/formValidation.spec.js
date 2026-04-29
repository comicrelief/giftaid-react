// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../../browserstack');
const { Commands } = require('../utils/commands');
const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();
const { selectors } = require('../utils/locators');

test.describe('Giftaid Update form validation @sanity @nightly-sanity', () => {
  let commands;
  
  test.beforeEach(async ({ page }) => {
    commands = new Commands(page);
    // Navigate to the Giftaid Update form
    await page.goto(`${process.env.BASE_URL}update`, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
  });
  
  test('empty input fields should show error messages', async ({ page }) => {
    // Submit the form without filling out any fields
    await page.click(selectors.formFields.submitButton);
    
    // Check for the error messages associated with each field
    await expect(page.locator(selectors.errorMessages.firstName)).toHaveText('Please fill in your first name');
    await expect(page.locator(selectors.errorMessages.lastName)).toHaveText('Please fill in your last name');
    await expect(page.locator(selectors.errorMessages.email)).toHaveText('Please fill in your email address');
    await expect(page.locator(selectors.errorMessages.postcode)).toHaveText('Please enter your postcode');
    await expect(page.locator(selectors.errorMessages.addressDetails)).toHaveText('Please fill in your address');
    await expect(page.locator(selectors.errorMessages.giftAidClaimChoice)).toHaveText('This field is required');
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
      await page.fill(selectors.formFields.firstName, testCase.input);
      if (testCase.input) {
        await page.keyboard.press('Enter'); // Trigger validation by clicking submit button
      }
      await expect(page.locator(selectors.errorMessages.firstName)).toHaveText(testCase.error);
    }
    
    // Test for a valid first name
    await page.fill(selectors.formFields.firstName, ''); // clear firstname field
    await commands.populateUpdateFormFields(page, { firstName: 'John' });
    await page.click(selectors.giftAidClaimChoice.yes); // Select yes for declaration
    await page.click(selectors.formFields.submitButton);  // Submit the form
    
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you, John!');
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
      await page.fill(selectors.marketingPreferences.fields.email, ''); // clear the email field before entering the test cases input
      await page.fill(selectors.marketingPreferences.fields.email, testCase.input);
      await page.keyboard.press('Enter'); // Trigger validation by clicking the submit button
      if (testCase.visible) {
        await expect(page.locator(selectors.errorMessages.email)).toBeVisible();
        await expect(page.locator(selectors.errorMessages.email)).toHaveText(testCase.error);
      } else {
        await expect(page.locator(selectors.errorMessages.email)).not.toBeVisible();
      }
    }
    
    // Test for a valid email
    const validEmail = `giftaid-update-staging-${chance.email()}`;
    await page.fill(selectors.marketingPreferences.fields.email, ''); // clear email field
    await commands.populateUpdateFormFields(page, { email: validEmail });
    await page.click(selectors.giftAidClaimChoice.no); // Select no for declaration
    await page.click(selectors.formFields.submitButton); // Submit the form
    
    await expect(page.locator(selectors.success.heading)).toHaveText('Thanks for letting us know');
    await page.close();
  });

  test('Validate mobile number field on giftaid update form', async ({ page }) => {
    const commands = new Commands(page);
    // List of allowed prefixes for UK mobile numbers
    const prefixes = ['071', '073', '074', '075', '077', '078', '079'];
    // Randomly select one prefix from the list
    const prefix = chance.pickone(prefixes);
    // Generate the remaining 8 digits randomly
    const mobile = `${prefix}${chance.string({ pool: '0123456789', length: 8 })}`;
    console.log('mobile number generated', mobile);

    // Test cases for various mobile number validations
    const mobileTestCases = [
      { input: '0722345678', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0722345678900', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0722 345 6789', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '0780ab5694245', error: 'Please enter a valid mobile phone number - it must be the same number associated with your donation.' },
      { input: '07123456789', valid: true },
      { input: '07340707252', valid: true },
    ];
    
    for (let testCase of mobileTestCases) {
      await page.locator(selectors.formFields.mobile).fill(''); // Clear the field before each test
      await page.locator(selectors.formFields.mobile).type(testCase.input, { delay: 100 });
      if (testCase.valid) {
        await expect(page.locator(selectors.errorMessages.mobile)).not.toBeVisible();
      } else {
        await expect(page.locator(selectors.errorMessages.mobile)).toHaveText(testCase.error);
      }
    }

    // Validate correct mobile number
    await page.locator(selectors.formFields.mobile).fill(''); // Ensure the field is cleared and filled with valid data
    await commands.populateUpdateFormFields(page, { lastName: 'test', mobile: mobile });
    await page.click(selectors.giftAidClaimChoice.yes); // Select yes for declaration
    await page.click(selectors.formFields.submitButton); // Submit the form
    
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you,  test!');
  });
  
  test('Postcode validation and form submission', async ({ page }) => {
    // Define postcodes and expected error messages
    const postcodes = [
      { input: 'S E 1 7 T P', error: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.' },
      { input: 'SE$%TP', error: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.' },
      { input: 'cro 7tp', error: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.' }
    ];
    
    // Test for each invalid postcode
    for (const postcode of postcodes) {
      await page.fill(selectors.formFields.postcode, '');
      await page.type(selectors.formFields.postcode, postcode.input);
      await expect(page.locator(selectors.errorMessages.postcode)).toBeVisible();
      await expect(page.locator(selectors.errorMessages.postcode)).toHaveText(postcode.error);
    }
    
    // Test for a valid postcode and subsequent form submission
    await page.fill(selectors.formFields.postcode, 'SE1 7TP');
    await page.click(selectors.formFields.postcodeLookup);
    
    // Checking whether address selection is available or if manual entry is needed
    if (await page.locator(selectors.address.addressSelect).isVisible()) {
      // Select the first address if available
      const options = await page.$$eval(selectors.address.addressSelectOptions, options => options.map(option => option.value));
      await page.selectOption(selectors.address.addressSelect, options[1]);
      await page.click(selectors.formFields.submitButton);
    } else {
      // Fallback to manual address input if no selection is available
      await page.click(selectors.address.manualAddressLink);
      await page.fill(selectors.address.address1, 'COMIC RELIEF');
      await page.fill(selectors.address.address2, 'CAMELFORD HOUSE 87-90');
      await page.fill(selectors.address.address3, 'ALBERT EMBANKMENT');
      await page.fill(selectors.address.town, 'LONDON');
      await page.click(selectors.formFields.submitButton);
    }
    
    await page.locator(selectors.formFields.firstName).fill('test');
    await page.locator(selectors.formFields.lastName).fill(chance.last());
    await page.locator(selectors.marketingPreferences.fields.email).fill(`giftaid-update-staging-${chance.email()}`);
    await page.fill(selectors.formFields.postcode, 'SE1 7TP');
    await page.click(selectors.giftAidClaimChoice.yes); // Select yes for declaration
    await page.click(selectors.formFields.submitButton); // Submit the form
    
    await expect(page.locator(selectors.success.heading)).toHaveText('Thank you,  test!');
    await page.close();
  });
});
