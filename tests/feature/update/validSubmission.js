const { v4: uuidv4 } = require('uuid');

module.exports = {

 '@tags': ['sanity', 'update', 'validSubmission'],

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

  'User completes giftaid update journey': function (client) {
    const transactionId = uuidv4();
    console.log('transactionId is:', transactionId);
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client.setValue('#field-input--transactionId', transactionId);
    client.page.giftaid().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from sms': function (client) {
    const transactionId = uuidv4();
    console.log('transactionId is:', transactionId);

    //sms
    client.url(process.env.BASE_URL + `update/${transactionId}`).maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('p.text-align-centre.transaction-id').text.to.equal(`Transaction ID: ${transactionId}`);
    client.click('#donationType>div:nth-child(2)>label');
    client.page.giftaid().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from online': function (client) {
    const transactionId = uuidv4();
    console.log('transactionId is:', transactionId);

    //online
    client.url(process.env.BASE_URL + `update/${transactionId}`).maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('p.text-align-centre.transaction-id').text.to.equal(`Transaction ID: ${transactionId}`);
    client.click('#donationType>div:nth-child(3)>label');
    client.page.giftaid().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User completes giftaid update journey from call centre': function (client) {
    const transactionId = uuidv4();
    console.log('transactionId is:', transactionId);

    //call centre
    client.url(process.env.BASE_URL + `update/${transactionId}`).maximizeWindow().waitForElementVisible('body', 1000);
    client.expect.element('p.text-align-centre.transaction-id').text.to.equal(`Transaction ID: ${transactionId}`);
      client.click('#donationType>div:nth-child(4)>label');
    client.page.giftaid().fillFormUpdateYes(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');
    client.end();
  },

  'User selects "no" for giftaid update declaration': function (client) {
    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client.setValue('#field-input--transactionId', 'D-BEX1501');
    client.page.giftaid().fillFormUpdateNo(client);
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 1000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thanks for letting us know');
    client.end();
  },

  'Verify url error message on Giftaid update form with invalid UUID': function (client) {
    client.url(process.env.BASE_URL + 'update/test').maximizeWindow().waitForElementVisible('body', 1000);
    client.click('#donationType>div:nth-child(3)>label');
    client.page.giftaid().fillFormUpdateYes(client);
    client.assert.containsText('#field-error--urlTransID>span', 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter');
    client.end();
  },
};
