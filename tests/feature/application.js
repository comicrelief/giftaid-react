module.exports = {

 '@tags': ['sanity', 'application', 'success-page'],

   'Ensure http redirects to https': function (client) {
   // Assure that validation shows when no input is submitted
   client
     .url(process.env.BASE_URL.replace('https', 'http'))
     .pause(500);

   client.url((result) => {
     client.assert.ok(result.value.indexOf('https') !== -1);
   });

   client.end();
   },

   'Ensure direct access to giftaid success page redirects to main giftaid homepage': function (client) {
     client.url(process.env.BASE_URL + 'success').maximizeWindow().waitForElementVisible('body', 1000);
     client.expect.element('h1[class=giftaid-title]').text.to.equal('Giftaid it');
     client.assert.elementPresent('#field-label--giftaid');
     client.assert.elementPresent('#field-input--mobile');
     client.assert.elementNotPresent('div.success-wrapper--inner>h1')
     client.end();
   },

   'Ensure direct access to giftaid update success page redirects to giftaid update homepage': function (client) {
     client.url(process.env.BASE_URL + 'update/success').maximizeWindow().waitForElementVisible('body', 1000);
     client.expect.element('h1[class=giftaid-title]').text.to.equal('Giftaid it');
     client.assert.elementPresent('#field-input--transactionId');
     client.assert.elementPresent('#field-input--emailaddress');
     client.assert.elementNotPresent('div.success-wrapper--inner>h1');
     client.end();
   }
};
