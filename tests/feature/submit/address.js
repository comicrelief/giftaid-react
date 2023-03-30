module.exports = {

  '@tags': ['sanity', 'submit', 'address'],

  'Submit form entering address using postcode lookup': function (client) {

    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'SE1 7TP');
    client.click('#postcode_button');
    client.waitForElementVisible('select#field-select--addressSelect', 1000);
    client.expect.element('label#field-label--addressSelect').text.to.equal('Select your address');
    client.click('select#field-select--addressSelect');
    client.click('#field-select--addressSelect > option:nth-child(5)');
    client.click('button[type="submit"]');
    client.pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      'test!');
    client.end();
  },

  'Submit form entering address manually': function (client) {

    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'SE1 7TP');
    client.click('a[aria-describedby=field-error--addressDetails]');
    client.waitForElementPresent('#field-input--address1', 1000);
    client.setValue('#field-input--address1', '21 test road');
    client.setValue('#field-input--address2', 'High road');
    client.setValue('#field-input--address3', 'Waterloo');
    client.setValue('#field-input--town', 'London');
    client.click('button[type="submit"]');
    client.pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      'test!');
    client.end();
  },

  'Validate postcode field': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');

    // postcode entered in lowercase should show error message
    client.setValue('#field-input--postcode', 'se17tp');
    client.assert.textContains('div#field-error--postcode > span', 'Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode entered in uppercase should show error message
    client.setValue('#field-input--postcode', 'SE17TP');
    client.assert.textContains('div#field-error--postcode > span', 'Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode with valid spaces should not show error message
    client.setValue('#field-input--postcode', 'SE1 7TP');
    client.assert.not.elementPresent('div#field-error--postcode > span');
    client.clearValue('#field-input--postcode');

    // postcode with extra spaces should not show error message
    client.setValue('#field-input--postcode', 'SE 1 7TP');
    client.assert.textContains('div#field-error--postcode > span', 'Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode with extra numbers in first part should show error message
    client.setValue('#field-input--postcode', 'SE 134 7TP');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode with 3 numbers in second part should show error message
    client.setValue('#field-input--postcode', 'SE1 777TP');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode with 2 numbers in second part should show error message
    client.setValue('#field-input--postcode', 'SE1 77TP');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // postcode with special characters should show error message
    client.setValue('#field-input--postcode', 'SE1@£7tp');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // valid postcode with lower and uppercase characters should not show error message
    client.setValue('#field-input--postcode', 'sE17tP');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode, using a space and capital letters');
    client.clearValue('#field-input--postcode');

    // submit form with valid postcode but not entering address field should show error messages on address fields
    client.setValue('#field-input--postcode', 'SE1 7TP');
    client.click('button[type="submit"]');
    client.expect.element('div#field-error--addressDetails > span').text.to.equal('Please fill in your address');

    // click enter address manually link to see the error messages
    client.expect.element('a[aria-describedby=field-error--addressDetails]').text.to.equal('Or enter your address manually');
    client.click('a[aria-describedby=field-error--addressDetails]');
    client.expect.element('div#field-error--address1 > span').text.to.equal('Please fill in your address line 1');
    client.expect.element('div#field-error--town > span').text.to.equal('Please fill in your town/city');

    // enter address fields with valid inputs should not show error messages
    client.setValue('input#field-input--address1', 'COMIC RELIEF');
    client.assert.not.elementPresent('div#field-error--address1 > span');
    client.setValue('#field-input--town', 'LONDON');
    client.assert.not.elementPresent('div#field-error--town > span');

    // submit the form once more should go to success page
    client.click('button[type="submit"]');
    client.pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      'test!');
    client.end();
  },
};
