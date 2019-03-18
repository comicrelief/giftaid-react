module.exports = {

 '@tags': ['sanity', 'submit'],

    beforeEach : function(client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    },

   'Verify all elements present on giftaid submit': function (client) {
     client
       .waitForElementVisible('body', 1000)
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
     client.page.mainGA().fillForm(client);
     client.waitForElementVisible('div.success-wrapper--inner > h1', 1000);
     client.expect.element('div > div.success-wrapper--inner > h1').text.to.equal('Thank you,\n' + 'test!');
     client.end();
   },

   'Verify error messages on Giftaid form': function (client) {
     client.click('button[type=submit]')
     client.assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox')
     client.assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number')
     client.assert.containsText('#field-error--firstname>span', 'Please fill in your first name')
     client.assert.containsText('#field-error--lastname>span', 'Please fill in your last name')
     client.assert.containsText('#field-error--postcode>span', 'Please enter your postcode')
     client.assert.containsText('#field-error--addressDetails>span', 'Please fill in your address')
     client.click('a[aria-describedby=field-error--addressDetails]')
     client.assert.containsText('#field-error--address1>span', 'Please fill in your address line 1')
     client.assert.containsText('#field-error--town>span', 'Please fill in your town/city')
     client.end();
   }
};
