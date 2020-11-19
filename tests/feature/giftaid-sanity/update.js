module.exports = {

 '@tags': ['sanity', 'update'],

  'Verify all elements present on giftaid update': function (client) {
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('#field-input--transactionId')
      .assert.elementPresent('#field-input--firstname')
      .assert.elementPresent('#field-input--lastname')
      .assert.elementPresent('#field-input--postcode')
      .assert.elementPresent('#postcode_button')
      .assert.elementPresent('#field-input--address1')
      .assert.elementPresent('#field-input--address2')
      .assert.elementPresent('#field-input--address3')
      .assert.elementPresent('#field-input--town')
      .assert.elementPresent('#field-select--country')
      .assert.elementPresent('#form > button')
      .assert.elementPresent('.form__row--just-in-time-block>div>a');
    client.end();
  },

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

  'User completes giftaid update journey': function (client) {
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client.setValue('#field-input--transactionId', '3D487A59-716B-440D-BD43-50ED301DD9BA');
    client.page.updateGA().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from sms': function (client) {
    //sms
    client.url(process.env.BASE_URL + 'update/3D487A59-716B-440D-BD43-50ED301DD9BA').maximizeWindow().waitForElementVisible('body', 1000);
    client.click('#donationType>div:nth-child(2)>label');
    client.page.updateGA().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from online': function (client) {
    //online
    client.url(process.env.BASE_URL + 'update/bb9aa5c9-5d93-4a34-a102-aaf378d16a73').maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('p.text-align-centre.transaction-id').text.to.equal('Transaction ID: bb9aa5c9-5d93-4a34-a102-aaf378d16a73');
    client.click('#donationType>div:nth-child(3)>label');
    client.page.updateGA().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from call centre': function (client) {
    //call centre
    client.url(process.env.BASE_URL + 'update/bc7ba5c9-5d93-4a34-a102-aaf378d16a74').maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('p.text-align-centre.transaction-id').text.to.equal('Transaction ID: bc7ba5c9-5d93-4a34-a102-aaf378d16a74');
      client.click('#donationType>div:nth-child(4)>label');
    client.page.updateGA().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User selects "no" for giftaid update declaration': function (client) {
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client.setValue('#field-input--transactionId', 'bc7ba5c9-5d93-4a34-a102-aaf378d16a74');
    client.page.updateNo().fillFormUpdateNo(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thanks for letting us know');
    client.end();
  },

  'Verify url error message on Giftaid update form with invalid UUID': function (client) {
    client.url(process.env.BASE_URL + 'update/test').maximizeWindow().waitForElementVisible('body', 1000);
    client.click('#donationType>div:nth-child(3)>label');
    client.page.updateGA().fillFormUpdateYes(client);
    client.assert.containsText('#field-error--urlTransID>span', 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter')
    client.end();
  },
};
