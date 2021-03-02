const updateCommands = {

  /**
   * Populate the giftaid update form with no to giftaid declaration
   * @param client
   */
  fillFormUpdateNo: function (client) {
    return client
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user')
      .setValue('#field-input--postcode', 'se1 7tp')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('#giftAidClaimChoice>div:nth-child(3)>label')
      .click('button[type=submit]')
      .pause(5000);
    },
};

module.exports = {
    commands: [updateCommands],
};
