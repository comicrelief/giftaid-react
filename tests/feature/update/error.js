module.exports = {

  '@tags': ['sanity', 'update', 'error'],

  'Verify error messages on Giftaid update form': function (client) {
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client
      .click('button[type=submit]')
      .assert.containsText('#field-error--transactionId>span', 'Please fill in your transaction id')
      .assert.containsText('#field-error--firstname>span', 'Please fill in your first name')
      .assert.containsText('#field-error--lastname>span', 'Please fill in your last name')
      .assert.containsText('#field-error--postcode>span', 'Please enter your postcode')
      .assert.containsText('#field-error--addressDetails>span', 'Please fill in your address')
      .click('a[aria-describedby=field-error--addressDetails]')
      .assert.containsText('#field-error--address1>span', 'Please fill in your address line 1')
      .assert.containsText('#field-error--town>span', 'Please fill in your town/city')
      .assert.containsText('#field-error--giftAidClaimChoice>span','This field is required');
    client.end();
  },
};
