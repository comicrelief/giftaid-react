var faker = require('faker/locale/en_GB');
var fname;

module.exports = {

    '@tags': ['sanity'],

    before : function(client) {
        client
            .url(process.env.BASE_URL)
            .maximizeWindow()
            .waitForElementVisible('body', 1000);
    },

    after : function(client) {
        client.end();
    },

    'Verify all the elements present': function (client) {

        client
            .assert.title('Gift Aid declaration | Comic Relief')
            .assert.elementPresent('#field-input--giftaid')
            .assert.elementPresent('#field-input--mobile')
            .assert.elementPresent('#field-input--firstname')
            .assert.elementPresent('#field-input--lastname')
            .assert.elementPresent('#field-input--postcode')
            .assert.elementPresent('#postcode_button')
            .assert.elementPresent('button[type=submit]')
            .assert.elementPresent('.form__row--just-in-time-block');

    },

    'Verify input field error message': function (client) {

        client
            .click('#field-input--giftaid')
            .assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox')
            .click('#field-input--giftaid')
            .assert.elementNotPresent('#field-error--giftaid>span')
            .clearValue('#field-input--mobile')
            .click('#field-input--firstname')
            .assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number')
            .setValue('#field-input--mobile','0208')
            .click('#field-input--firstname')
            .assert.containsText('#field-error--mobile>span', 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.')
            .clearValue('#field-input--mobile')
            .setValue('#field-input--mobile', faker.phone.phoneNumber('07#########'))
            .click('#field-input--firstname')
            .assert.elementNotPresent('#field-error--mobile>span')
            .clearValue('#field-input--firstname')
            .click('#field-input--lastname')
            .assert.containsText('#field-error--firstname>span', 'Please fill in your first name')
            .setValue('#field-input--firstname', fname=faker.name.firstName())
            .click('#field-input--lastname')
            .assert.elementNotPresent('#field-error--firstname>span')
            .clearValue('#field-input--lastname')
            .click('#field-input--postcode')
            .assert.containsText('#field-error--lastname>span', 'Please fill in your last name')
            .setValue('#field-input--lastname', faker.name.lastName())
            .click('#field-input--postcode')
            .assert.elementNotPresent('#field-error--lastname>span')
            .clearValue('#field-input--postcode')
            .click('#postcode_button')
            .waitForElementVisible('#field-error--postcode>span', 1000)
            .assert.containsText('#field-error--postcode>span', 'No postcode provided')
            .setValue('#field-input--postcode','SW15 3RY')
            .assert.elementNotPresent('#field-error--postcode>span')
            .click('#postcode_button')
            .assert.elementPresent('#field-select--addressSelect')
            .click('a[role=button]')
            .waitForElementVisible('#field-input--address1', 1000)
            .clearValue('#field-input--address1')
            .click('#field-input--address2')
            .assert.containsText('#field-error--address1>span', 'Please fill in your address line 1')
            .setValue('#field-input--address1', faker.address.streetAddress())
            .assert.elementNotPresent('#field-error--address1>span')
            .clearValue('#field-input--town')
            .click('#field-input--address3')
            .assert.containsText('#field-error--town>span', 'Please fill in your town/city')
            .setValue('#field-input--town', faker.address.city())
            .assert.elementNotPresent('#field-error--town>span')
            .click('button[type=submit]')
            .waitForElementVisible('div.success-wrapper--inner', 1000)
            .assert.containsText('div.success-wrapper--inner>h1', 'Thank you,\n' + fname + '!');

    },

};

