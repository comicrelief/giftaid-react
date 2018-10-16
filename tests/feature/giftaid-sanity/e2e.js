
module.exports = {

    '@tags': ['sanity', 'main'],

    'User completes main giftaid journey': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client
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
    client.waitForElementVisible('div.success-wrapper--inner > h1', 1000);

    client.expect.element('div > div.success-wrapper--inner > h1').text.to.equal('Thank you,\n' + 'test!');

    client.end();

    },
};

