module.exports = {

 '@tags': ['sanity', 'submit'],

   /* beforeEach : function(client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    },
*/
   'Verify all elements present on giftaid submit': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client
       .assert.elementPresent('#field-label--giftaid')
       .assert.elementPresent('#field-input--mobile')
       .assert.elementPresent('#field-input--firstname')
       .assert.elementPresent('#field-input--lastname')
       .assert.elementPresent('#field-input--postcode')
       .assert.elementPresent('#postcode_button')
       .assert.elementPresent('#field-input--address1')
       .assert.elementPresent('#field-input--address2')
       .assert.elementPresent('#field-input--address3')
       .assert.elementPresent('#field-input--town')
       .assert.elementPresent('#field-select--country')
       .assert.elementPresent('#field-wrapper--Email')
       .assert.elementPresent('#field-wrapper--Post')
       .assert.elementPresent('#field-wrapper--Phone')
       .assert.elementPresent('#field-wrapper--SMS')
       .assert.elementPresent('#form > button')
       .assert.elementPresent('.form__row--just-in-time-block>div>a');
     client.end();
   },

   'User completes main giftaid journey': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.page.form().fillForm(client);
     client.waitForElementVisible('div > h1', 2000);
     client.expect.element('div > h1').text.to.equal('Thank you,\n' +
     'test!');
     client.end();
   },

   'Verify error messages on giftaid form': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.click('button[type=submit]');
     client.assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox');
     client.assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number');
     client.assert.containsText('#field-error--firstname>span', 'Please fill in your first name');
     client.assert.containsText('#field-error--lastname>span', 'Please fill in your last name');
     client.assert.containsText('#field-error--postcode>span', 'Please enter your postcode');
     client.assert.containsText('#field-error--addressDetails>span', 'Please fill in your address');
     client.click('a[aria-describedby=field-error--addressDetails]');
     client.assert.containsText('#field-error--address1>span', 'Please fill in your address line 1');
     client.assert.containsText('#field-error--town>span', 'Please fill in your town/city');
     client.end();
   },

   'Submit form without checking giftaid cliam should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--lastname', 'user');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('#postcode_button');
     client.click('#field-select--addressSelect');
     client.click('#field-select--addressSelect>option:nth-child(6)');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox');
     client.end();
   },

   'Submit form with empty mobile number should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--lastname', 'user');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('#postcode_button');
     client.click('#field-select--addressSelect');
     client.click('#field-select--addressSelect>option:nth-child(6)');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number');
     client.end();
   },

   'Submit form with empty first name should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--lastname', 'user');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('#postcode_button');
     client.click('#field-select--addressSelect');
     client.click('#field-select--addressSelect>option:nth-child(6)');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--firstname', 'Please fill in your first name');
     client.end();
   },

   'Submit form with empty last name should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('#postcode_button');
     client.click('#field-select--addressSelect');
     client.click('#field-select--addressSelect>option:nth-child(6)');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--lastname', 'Please fill in your last name');
     client.end();
   },

   'Submit form with empty postcode should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--lastname', 'user');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--postcode', 'Please enter your postcode');
     client.end();
   },

   'Submit form with empty town should give error message': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--lastname', 'user');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('a[aria-describedby=field-error--addressDetails]');
     client.pause(200);
     client.setValue('#field-input--address1', '21 test road');
     client.click('button[type=submit]');
     client.pause(2000);
     client.expect.element('div > h1').text.to.not.equal('Sorry!');
     client.assert.containsText('#field-error--town', 'Please fill in your town/city');
     client.end();
    },

   'Validate marketing prefs': function (client) {
     client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementPresent('#field-label--giftaid', 1000);
     client.click('#field-label--giftaid');
     client.setValue('#field-input--mobile', '07123456789');
     client.setValue('#field-input--firstname', 'test');
     client.setValue('#field-input--lastname', 'user');
     client.setValue('#field-input--postcode', 'se1 7tp');
     client.click('a[aria-describedby=field-error--addressDetails]');
     client.pause(2000);
     client.setValue('#field-input--address1', '21 test road');
     client.setValue('#field-input--town', 'London');
     client.expect.element('.form__row--marketing-consent>div>div>p:nth-child(2)').text.to.equal('How would you like to hear from us?');
     //email
     client.waitForElementVisible('#field-wrapper--Email', 1000);
     client.click('#field-wrapper--Email>div:nth-child(2)>label');
     client.assert.containsText('#field-wrapper--Email>div:nth-child(2)>label', 'No');
     client.assert.elementNotPresent('#field-input--email');
     client.click('#field-wrapper--Email>div:nth-child(1)>label');
     client.assert.containsText('#field-wrapper--Email>div:nth-child(1)>label', 'Yes');
     client.assert.elementPresent('#field-input--email');
     client.setValue('#field-input--email','test@.com');
     client.waitForElementPresent('#field-error--email', 2000);
     client.assert.containsText('#field-error--email', 'Please fill in a valid email address');
     client.clearValue('#field-input--email');
     client.setValue('#field-input--email','#@%^%#$@#$@#.com');
     client.waitForElementPresent('#field-error--email', 2000);
     client.assert.containsText('#field-error--email', 'Please fill in a valid email address');
     client.clearValue('#field-input--email');
     client.setValue('#field-input--email','email@-example.com');
     client.waitForElementPresent('#field-error--email', 2000);
     client.assert.containsText('#field-error--email', 'Please fill in a valid email address');
     client.clearValue('#field-input--email');
     client.setValue('#field-input--email','email.example.com');
     client.waitForElementPresent('#field-error--email', 2000);
     client.assert.containsText('#field-error--email', 'Please fill in a valid email address');
     client.clearValue('#field-input--email');
     client.click('button[type=submit]');
     client.assert.containsText('#field-error--email', 'Please fill in your email address');
     client.setValue('#field-input--email','exampleexampleexample@exampleexampleexample.com');
     client.assert.elementNotPresent('#field-error--email');
     client.clearValue('#field-input--email');
     //post
     client.waitForElementVisible('#field-wrapper--Post', 2000);
     client.click('#field-wrapper--Post>div:nth-child(2)>label');
     client.assert.containsText('#field-wrapper--Post>div:nth-child(2)>label', 'No');
     client.click('#field-wrapper--Post>div:nth-child(1)>label');
     client.assert.containsText('#field-wrapper--Post>div:nth-child(1)>label', 'Yes');
     //phone
     client.waitForElementVisible('#field-wrapper--Phone', 2000);
     client.click('#field-wrapper--Phone>div:nth-child(2)>label');
     client.assert.containsText('#field-wrapper--Phone>div:nth-child(2)>label', 'No');
     client.click('#field-wrapper--Phone>div:nth-child(1)>label');
     client.assert.containsText('#field-wrapper--Phone>div:nth-child(1)>label', 'Yes');
     //SMS
     client.waitForElementVisible('#field-wrapper--SMS', 2000);
     client.click('#field-wrapper--SMS>div:nth-child(2)>label');
     client.assert.containsText('#field-wrapper--SMS>div:nth-child(2)>label', 'No');
     client.click('#field-wrapper--SMS>div:nth-child(1)>label');
     client.assert.containsText('#field-wrapper--SMS>div:nth-child(1)>label', 'Yes');

     //enter valid email
     client.setValue('#field-input--email', 'test@comicrelief.com');
     client.assert.elementNotPresent('#field-error--email');
     client.click('button[type=submit]');
     client.pause(5000);
     client.waitForElementVisible('div > h1', 2000);
     client.expect.element('div > h1').text.to.equal('Thank you,\n' +
     'test!');
     client.end();

   },


   'User completes main giftaid journey from link with token': function (client) {
     client.url(process.env.BASE_URL + 'uX8R5SzcKfk=').maximizeWindow().waitForElementVisible('body', 1000);
     client.page.form().fillFormPrefilledMobile(client);
     client.waitForElementVisible('div > h1', 2000);
     client.expect.element('div > h1').text.to.equal('Thank you,\n' +
       'test!');
     client.end();
   },
};
