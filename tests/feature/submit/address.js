module.exports = {

  '@tags': ['sanity', 'submit', 'address'],

  'Submit form entering address using postcode lookup': function (client) {

    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'se17tp');
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
    client.setValue('#field-input--postcode', 'se17tp');
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
    // postcode entered in lowercase should not show error message
    client.setValue('#field-input--postcode', 'se17tp');
    client.click('#postcode_button');
    client.assert.not.elementPresent('div#field-error--postcode > span');
    client.clearValue('#field-input--postcode');
    // postcode entered in uppercase should not show error message
    client.setValue('#field-input--postcode', 'SE17TP');
    client.click('#postcode_button');
    client.assert.not.elementPresent('div#field-error--postcode > span');
    client.clearValue('#field-input--postcode');
    // postcode with valid spaces should not show error message
    client.setValue('#field-input--postcode', 'SE1 7TP');
    client.click('#postcode_button');
    client.assert.not.elementPresent('div#field-error--postcode > span');
    client.clearValue('#field-input--postcode');
    // postcode with extra spaces as long as the value is right should not show error message
    client.setValue('#field-input--postcode', 'SE 1 7TP');
    client.click('#postcode_button');
    client.assert.not.elementPresent('div#field-error--postcode > span');
    client.clearValue('#field-input--postcode');
    // postcode with extra numbers in first part should show error message
    client.setValue('#field-input--postcode', 'SE 134 7TP');
    client.click('#postcode_button');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode to find your address');
    client.clearValue('#field-input--postcode');
    // postcode with 3 numbers in second part should show error message
    client.setValue('#field-input--postcode', 'SE1 777TP');
    client.click('#postcode_button');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid UK postcode to find your address');
    client.clearValue('#field-input--postcode');
    // postcode with 2 numbers in second part should show error message
    client.setValue('#field-input--postcode', 'SE1 77TP');
    client.click('#postcode_button');
    client.expect.element('div#field-error--postcode > span').text.to.equal('Sorry, we could not find any addresses in that postcode, please check the postcode, or use the manual entry');
    client.clearValue('#field-input--postcode');

    // TODO: commenting out validation steps temporarily
    // // postcode with special characters should show error message
    // client.setValue('#field-input--postcode', 'SE1@£7tp');
    // client.click('#postcode_button');
    // client.expect.element('div#field-error--postcode > span').text.to.equal('Please enter a valid postcode');
    // client.clearValue('#field-input--postcode');
    // // valid postcode with lower and uppercase characters should not show error message
    // client.setValue('#field-input--postcode', 'sE17tP');
    // client.click('#postcode_button');
    // client.assert.not.elementPresent('div#field-error--postcode > span');
    // client.clearValue('#field-input--postcode');
    // submit form with valid postcode but not entering address field should show error messages on address fields
    client.setValue('#field-input--postcode', 'SE17TP');
    client.click('button[type="submit"]');
    client.expect.element('div#field-error--addressSelect > span').text.to.equal('Please select your address');
    client.expect.element('a[aria-describedby=field-error--addressDetails]').text.to.equal('Or enter your address manually');
    // click enter address manually link to see the error messages
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
