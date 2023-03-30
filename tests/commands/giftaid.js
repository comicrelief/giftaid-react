const faker = require('faker');

const randomString = faker.lorem.word(5);

const updateCommands = {

  /**
   * Populate the giftaid update form with no to giftaid declaration
   * @param client
   */
  fillFormUpdateNo: function (client) {
    return client
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user' + randomString)
      .setValue('#field-input--postcode', 'SE1 7TP')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('#giftAidClaimChoice>div:nth-child(3)>label')
      .click('button[type=submit]')
      .pause(5000);
  },

  /**
   * Populate the giftaid update form with yes to giftaid declaration
   * @param client
   */
  fillFormUpdateYes: function (client) {
    return client
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user' + randomString)
      .setValue('#field-input--email', `giftaid-staging-${randomString}@email.sls.comicrelief.com`)
      .setValue('#field-input--postcode', 'SE1 7TP')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('#giftAidClaimChoice>div:nth-child(2)>label')
      .click('button[type=submit]')
      .pause(5000);
  },
};

module.exports = {
    commands: [updateCommands],
};
