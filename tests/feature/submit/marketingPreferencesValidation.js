const faker = require('faker');

const mobile = faker.phone.phoneNumber('07#########');
const telephone = faker.phone.phoneNumber('0208#######');


module.exports = {

 '@tags': ['sanity', 'submit', 'marketingPreferencesValidation'],

 'Validate marketing prefs': function (client) {

   const email = 'giftaid-staging@email.sls.comicrelief.com';

   client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
   client.waitForElementPresent('#field-label--giftaid', 1000);
   client.click('#field-label--giftaid');
   client.setValue('#field-input--mobile', mobile);
   client.setValue('#field-input--firstname', 'test');
   client.setValue('#field-input--lastname', 'user');
   client.setValue('#field-input--postcode', 'SE1 7TP');
   client.click('a[aria-describedby=field-error--addressDetails]');
   client.waitForElementPresent('#field-input--address1', 1000);
   client.setValue('#field-input--address1', '21 test road');
   client.setValue('#field-input--address2', 'High road');
   client.setValue('#field-input--address3', 'Waterloo');
   client.setValue('#field-input--town', 'London');

   //email
   client.waitForElementVisible('#field-wrapper--Email', 1000);
   // No option
   client.click('#field-wrapper--Email>div:nth-child(1)');
   client.assert.elementPresent('#field-input--email');
   // incomplete email should show error message
   client.setValue('#field-input--email','test@.com');
   client.waitForElementPresent('#field-error--email', 1000);
   client.expect.element('#field-error--email').text.to.equal('Please fill in a valid email address');
   // email with special chars should show error message
   client.clearValue('#field-input--email');
   client.setValue('#field-input--email','test@%£$^*/.com');
   client.waitForElementPresent('#field-error--email', 2000);
   client.expect.element('#field-error--email').text.to.equal('Please fill in a valid email address');
   // email without '@' should show error message
   client.clearValue('#field-input--email');
   client.setValue('#field-input--email', 'email.example.com');
   client.waitForElementPresent('#field-error--email', 2000);
   client.expect.element('#field-error--email').text.to.equal('Please fill in a valid email address');
   // long email should not show error message
   client.clearValue('#field-input--email');
   client.setValue('#field-input--email', 'exampleexampleexampleexampleexample@exampleexampleexampleexampleexampleexample.com');
   client.assert.not.elementPresent('#field-error--email');
   // email with these special chars are allowed and should not show error message
   client.clearValue('#field-input--email');
   client.setValue('#field-input--email', 'Test0-9!#$%&\'*+/=?^_{|}~-@comicrelief_9-8.com.uk');
   client.assert.not.elementPresent('#field-error--email');
   // email with these special chars are allowed and should not show error message
   client.clearValue('#field-input--email');
   client.setValue('#field-input--email', 'Test0-9.%&\'+_-@comicrelief-9-8.com.uk');
   client.assert.not.elementPresent('#field-error--email');

   // Phone - accepts both mobile & telephone numbers
   client.waitForElementVisible('#field-wrapper--Phone', 2000);
   client.click('#field-wrapper--Phone div:nth-child(1)');
   client.assert.elementPresent('input#field-input--phone');

   // empty field
   client.setValue('input#field-input--phone', '07123456789');
   client.clearValue('input#field-input--phone');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in your phone number');

   // mobile number less than 11 digits shows error message
   client.setValue('input#field-input--phone', '0712345678');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // mobile number more than 11 digits shows error message
   client.setValue('input#field-input--phone', '071234567890');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // mobile number with spaces should show error
   client.setValue('input#field-input--phone', '0712 345 6789');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number less than 11 digits shows error message
   client.setValue('input#field-input--phone', '0208569424');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number more than 11 digits shows error message
   client.setValue('input#field-input--phone', '020856942456');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number with spaces should show error
   client.setValue('input#field-input--phone', '0208 569 4245');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number with alphabetical chars in between the number should show error
   client.setValue('input#field-input--phone', '0208ab5694245');
   client.assert.elementPresent('div#field-error--phone > span');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // mobile number with alphabetical chars should show error
   client.setValue('input#field-input--phone', '0780ab5694245');
   client.assert.elementPresent('div#field-error--phone > span');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number starting with alphabetical chars should show error
   client.setValue('input#field-input--phone', 'abcv07805694245');
   client.assert.elementPresent('div#field-error--phone > span');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number ending with alphabetical chars should show error
   client.setValue('input#field-input--phone', '07805694245dfef');
   client.assert.elementPresent('div#field-error--phone > span');
   client.expect.element('div#field-error--phone > span').text.to.equal('Please fill in a valid UK phone number, with no spaces');
   client.clearValue('input#field-input--phone');

   // telephone number starting with '+' should not show error
   client.setValue('input#field-input--phone', '+447805694245');
   client.assert.not.elementPresent('div#field-error--phone > span');
   client.clearValue('input#field-input--phone');

   // telephone number starting with '+0044' should not show error
   client.setValue('input#field-input--phone', '+00447805694245');
   client.assert.not.elementPresent('div#field-error--phone > span');
   client.clearValue('input#field-input--phone');

   // telephone number starting with '0044' should not show error
   client.setValue('input#field-input--phone', '00447805694245');
   client.assert.not.elementPresent('div#field-error--phone > span');
   client.clearValue('input#field-input--phone');

   // clicking 'No' should not clear the value present in the phone field
   client.clearValue('input#field-input--phone');
   client.setValue('input#field-input--phone', telephone);
   client.assert.value('input#field-input--phone', telephone);

   // SMS
   client.waitForElementVisible('#field-wrapper--SMS', 2000);
   client.click('#field-wrapper--SMS div:nth-child(1) > label');

   // enter valid email
   client.setValue('#field-input--email', email);
   client.assert.not.elementPresent('#field-error--email');
   client.waitForElementVisible('button[type="submit"]', 2000);
   client.click('button[type="submit"]');
   client.pause(5000);
   client.waitForElementVisible('div > h1', 3000);
   client.expect.element('div > h1').text.to.equal('Thank you,\n' +
   'test!');
   client.end();
 },
};
