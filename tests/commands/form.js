const commands = {
  fillForm: function (client) {
    return client
    .click('#field-input--giftaid')
    .setValue('#field-input--mobile', '07123456789')
    .setValue('#field-input--firstname', 'test')
    .setValue('#field-input--lastname', 'user')
    .setValue('#field-input--postcode', 'se1 7tp')
    .click('a[aria-describedby=field-error--addressDetails]')
    .pause(200)
    .setValue('#field-input--address1', '21 test road')
    .setValue('#field-input--town', 'London')
    .click('button[type=submit]')
    .pause(5000);
  },
};

module.exports = {
    fillForm: commands.fillForm,
};