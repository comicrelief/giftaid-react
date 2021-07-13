module.exports = {

  '@tags': ['sanity', 'update', 'success-page'],

  'Ensure direct access to giftaid update success page redirects to giftaid update homepage': function (client) {
    client.url(process.env.BASE_URL + 'update/success').maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('h1[class=giftaid-title]').text.to.equal('Giftaid it');
    client.assert.elementPresent('#field-input--transactionId');
    client.assert.elementPresent('#field-input--emailaddress');
    client.assert.not.elementPresent('div.success-wrapper--inner>h1');
    client.end();
  }
};
