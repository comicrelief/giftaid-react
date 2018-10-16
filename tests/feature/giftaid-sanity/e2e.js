

module.exports = {

    '@tags': ['sanity', 'main'],

    'User completes main giftaid journey': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.page.form().fillForm();
        // .click('#field-input--giftaid')
        // .setValue('#field-input--mobile', '07123456789')
        // .setValue('#field-input--firstname', 'test')
        // .setValue('#field-input--lastname', 'user')
        // .setValue('#field-input--postcode', 'se1 7tp')
        // .click('a[aria-describedby=field-error--addressDetails]')
        // .pause(200)
        // .setValue('#field-input--address1', '21 test road')
        // .setValue('#field-input--town', 'London')
        // .click('button[type=submit]')
        // .pause(5000);
    client.waitForElementVisible('div.success-wrapper--inner > h1', 1000);

    client.expect.element('div > div.success-wrapper--inner > h1').text.to.equal('Thank you,\n' + 'test!');


    client.end();

    },

    // 'Verify input field error message': function (client) {
    //
    //     client
    //         .click('#field-input--giftaid')
    //         .click('#field-input--giftaid')
    //         .assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox')
    //         .click('#field-input--giftaid')
    //         .assert.elementNotPresent('#field-error--giftaid>span')
    //         .clearValue('#field-input--mobile')
    //         .click('#field-input--firstname')
    //         .assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number')
    //         .setValue('#field-input--mobile','0208')
    //         .click('#field-input--firstname')
    //         .assert.containsText('#field-error--mobile>span', 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.')
    //         .clearValue('#field-input--mobile')
    //         .setValue('#field-input--mobile', faker.phone.phoneNumber('07#########'))
    //         .click('#field-input--firstname')
    //         .assert.elementNotPresent('#field-error--mobile>span')
    //         .clearValue('#field-input--firstname')
    //         .click('#field-input--lastname')
    //         .assert.containsText('#field-error--firstname>span', 'Please fill in your first name')
    //         .setValue('#field-input--firstname', fname=faker.name.firstName())
    //         .click('#field-input--lastname')
    //         .assert.elementNotPresent('#field-error--firstname>span')
    //         .clearValue('#field-input--lastname')
    //         .click('#field-input--postcode')
    //         .assert.containsText('#field-error--lastname>span', 'Please fill in your last name')
    //         .setValue('#field-input--lastname', faker.name.lastName())
    //         .click('#field-input--postcode')
    //         .assert.elementNotPresent('#field-error--lastname>span')
    //         .clearValue('#field-input--postcode')
    //         .click('#postcode_button')
    //         .waitForElementVisible('#field-error--postcode>span', 1000)
    //         .assert.containsText('#field-error--postcode>span', 'No postcode provided')
    //         .setValue('#field-input--postcode','SW15 3RY')
    //         .assert.elementNotPresent('#field-error--postcode>span')
    //         .click('#postcode_button')
    //         .assert.elementPresent('#field-select--addressSelect')
    //         .click('a[role=button]')
    //         .waitForElementVisible('#field-input--address1', 1000)
    //         .clearValue('#field-input--address1')
    //         .click('#field-input--address2')
    //         .assert.containsText('#field-error--address1>span', 'Please fill in your address line 1')
    //         .setValue('#field-input--address1', faker.address.streetAddress())
    //         .assert.elementNotPresent('#field-error--address1>span')
    //         .clearValue('#field-input--town')
    //         .click('#field-input--address3')
    //         .assert.containsText('#field-error--town>span', 'Please fill in your town/city')
    //         .setValue('#field-input--town', faker.address.city())
    //         .assert.elementNotPresent('#field-error--town>span')
    //         .click('button[type=submit]')
    //         .waitForElementVisible('div.success-wrapper--inner', 1000)
    //         .assert.containsText('div.success-wrapper--inner>h1', 'Thank you,\n' + fname + '!');
    //
    // },

};

