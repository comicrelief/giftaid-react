// @ts-check
const { test, expect } = require('@playwright/test');
const { Commands } = require('../utils/commands');

test.describe('Giftaid update form validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/update', { timeout: 30000 });
    
    await page.waitForLoadState('domcontentloaded');
  });
  
  test('empty input fields should show error messages', async ({ page }) => {
    
    // submit the form
    await page.locator('button[type=submit]').click();

    await expect(page.locator('div#field-error--firstname > span')).toContainText('Please fill in your first name');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('Please fill in your last name');
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter your postcode');
    await expect(page.locator('div#field-error--addressDetails > span')).toContainText('Please fill in your address');
    
    // click on manual address link to show address fields error messages
    await page.locator('a[aria-describedby=field-error--addressDetails]').click();
    await expect(page.locator('div#field-error--address1 > span')).toContainText('Please fill in your address line 1');
    await expect(page.locator('div#field-error--town > span')).toContainText('Please fill in your town/city');
    
    // giftaid declaration error message
    await expect(page.locator('div#field-error--giftAidClaimChoice > span')).toContainText('This field is required');

    // DonationType error message
    await expect(page.locator('#field-error--donationType')).toContainText('This field is required');
    
    await page.close();
  });
  
  
  test('validate first name field on giftaid update form', async ({ page }) => {
    
    const commands = new Commands(page);
    
    await page.locator('#field-input--firstname').fill('test');
    await page.locator('#field-input--firstname').fill('');
    await expect(page.locator('#field-error--firstname')).toContainText('Please fill in your first name');
    
    // enter firstname field with special chars should show error message
    await page.locator('#field-input--firstname').type('Test^$%£');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts alphabetic characters and \' -\n');
    
    // firstname with just a space should show error message
    await page.keyboard.press('Backspace');
    await page.locator('#field-input--firstname').type(' ');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts alphabetic characters and \' -\n');
    
    // firstname with a mixture of alphanumeric chars should show error message
    await page.locator('#field-input--firstname').fill(''); // clear the first-name field
    await page.locator('#field-input--firstname').type('123Test');
    await expect(page.locator('#field-error--firstname')).toContainText('This field only accepts alphabetic characters and \' -\n');
    
    // clear the first name field
    await page.locator('#field-input--firstname').fill('');
    
    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields(page);

    // Select 'Online' donation type
    await page.locator('#donationType>div:nth-child(3)>label').click();

    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
    
    // submit the form
    await page.locator('button[type=submit]').click();
    
    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');
    
    await page.close();
  });
  
  test('validate last name field on giftaid update form', async ({ page }) => {
    
    const commands = new Commands(page);
    
    await page.locator('#field-input--lastname').fill('test lastname');
    await page.locator('#field-input--lastname').fill('');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('Please fill in your last name');
    
    // enter lastname field with special chars should show error message
    await page.locator('#field-input--lastname').type('Test^$%£');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('This field only accepts alphanumeric characters and , . ( ) / & \' -');
    
    // lastname with just a space should show error message
    await page.keyboard.press('Backspace');
    await page.locator('#field-input--lastname').type(' ');
    await expect(page.locator('div#field-error--lastname > span')).toContainText('This field only accepts alphanumeric characters and , . ( ) / & \' -');
    
    // lastname with a mixture of alphanumeric chars should not show error message
    await page.locator('#field-input--lastname').fill(''); // clear the last-name field
    await page.locator('#field-input--lastname').type('123Test');
    // should not show error message
    expect(await page.locator('div#field-error--lastname > span').count()).toEqual(0);
    
    // clear the last name field
    await page.locator('#field-input--lastname').fill('');
    
    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields(page);

    // Select 'Online' donation type
    await page.locator('#donationType>div:nth-child(3)>label').click();
    
    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
    
    // submit the form
    await page.locator('button[type=submit]').click();
    
    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');
    
    await page.close();
    
  });
  
  test('validate email field on giftaid update form', async ({ page }) => {
    
    const commands = new Commands(page);
    
    // email validation
    // email that has $ after the domian name should show error message
    await page.locator('input#field-input--email').fill('test@comic$relief.com');
    await expect(page.locator('div#field-error--email > span')).toContainText('Please fill in a valid email address');
    
    // email that has @ after the domian name should show error message
    await page.locator('input#field-input--email').fill(''); // clear the email field
    await page.locator('input#field-input--email').type('test@c{(micrelief.com');
    await expect(page.locator('div#field-error--email > span')).toContainText('Please fill in a valid email address');
    
    // email that has % after the domian name should show error message
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type('test@comic%relief.com');
    await expect(page.locator('div#field-error--email > span')).toContainText('Please fill in a valid email address');
    
    // email that has special chars $%^ before domain name should not show error message
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type('te$%^st@comicrelief.com');
    await expect(page.locator('div#field-error--email > span')).not.toBeVisible();
    
    // email that has mix of special chars that's valid and not valid should show error message
    await page.locator('input#field-input--email').fill('');
    await page.locator('input#field-input--email').type('Test0-9!#$%&\'*+/=?^_{|}~-@comicrelief_9-8.com.uk');
    await expect(page.locator('div#field-error--email > span')).toContainText('Please fill in a valid email address');
    
    // clear the email field
    await page.locator('input#field-input--email').fill('');
    
    // entering valid input fields should be able to submit the form
    await commands.populateUpdateFormFields(page);

    // Select 'Online' donation type
    await page.locator('#donationType>div:nth-child(3)>label').click();

    // select giftaid declaration
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
  
    // submit the form
    await page.locator('button[type=submit]').click();
    
    await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
      'test!');
    
    await page.close();
  });

  // HERE
  test.only('Validate mobile number field', async ({ page }) => {
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

    // Select yes for giftaid declaration to complete the form
    await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();

    // Select 'Online' donation type
    await page.locator('#donationType>div:nth-child(3)>label').click();

    // await page.waitForTimeout(5000);


    await page.locator('button[type=submit]').click();
    await expect(page.locator('div > h1')).toHaveText('Thank you, test!');
  });
  
  test('postcode entered with extra spaces should show error message', async ({ page }) => {
    
    await page.locator('input#field-input--postcode').type('S E 1 7 T P');
    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    await page.close();
  });
  
  test('postcode entered in lowercase should show error message', async ({ page }) => {
    
    await page.locator('input#field-input--postcode').type('se17tp');
    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    await page.close();
  });
  
  test('postcode entered with no spaces should show error message', async ({ page }) => {
    
    await page.locator('input#field-input--postcode').type('SE17TP');
    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    await page.close();
  });
  
  test('postcode entered with special characters should show error message', async ({ page }) => {
    
    await page.locator('input#field-input--postcode').type('SE$%TP');
    await expect(page.locator('div#field-error--postcode > span')).toBeVisible();
    await expect(page.locator('div#field-error--postcode > span')).toContainText('Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.');
    
    await page.close();
  });
  
  test('enter valid UK postcode on giftaid update form using postcode lookup should be able to submit the form', async ({ page }) => {
    
    // fill in all input fields
    await page.locator('#field-input--firstname').fill('test');
    await page.locator('#field-input--lastname').fill('test lastname');
    await page.locator('input#field-input--email').fill('giftaid-staging-@email.sls.comicrelief.com');
    
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

      // Select 'Online' donation type
      await page.locator('#donationType>div:nth-child(3)>label').click();
      
      // select giftaid declaration
      await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
      
      // clicking on submit button should show error on address lookup
      await page.locator('button[type=submit]').click();
      
      await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
        'test!');
    } else {
      
      // click on manual address link
      await page.locator('a[aria-describedby=field-error--addressDetails]').click();
      await page.locator('#field-input--address1').type('COMIC RELIEF');
      await page.locator('#field-input--address2').type('CAMELFORD HOUSE 87-90');
      await page.locator('#field-input--address3').type('ALBERT EMBANKMENT');
      await page.locator('#field-input--town').type('LONDON');

      // Select 'Online' donation type
      await page.locator('#donationType>div:nth-child(3)>label').click();
      
      // select giftaid declaration
      await page.locator('#giftAidClaimChoice>div:nth-child(2)>label').click();
      
      // clicking on submit button should show error on address lookup
      await page.locator('button[type=submit]').click();
      
      await expect(page.locator('div > h1')).toContainText('Thank you,\n' +
        'test!');
    }
    await page.close();
  });
});
