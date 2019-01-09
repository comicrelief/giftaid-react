const commands = {
  fillFormUpdateNo: function (client) {
    return client
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user')
      .setValue('#field-input--postcode', 'se1 7tp')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('input[type="radio"][value="0"]')
      .click('button[type=submit]')
      .pause(5000);
    },
};

module.exports = {
    fillFormUpdateNo: commands.fillFormUpdateNo,
};
