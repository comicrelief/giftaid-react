module.exports = {

  '@tags': ['sanity', 'error'],

  'Verify error messages on empty giftaid submission': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.click('button[type=submit]');
    client.assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox');
    client.assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number');
    client.assert.containsText('#field-error--firstname>span', 'Please fill in your first name');
    client.assert.containsText('#field-error--lastname>span', 'Please fill in your last name');
    client.assert.containsText('#field-error--postcode>span', 'Please enter your postcode');
    client.assert.containsText('#field-error--addressDetails>span', 'Please fill in your address');
    client.click('a[aria-describedby=field-error--addressDetails]');
    client.assert.containsText('#field-error--address1>span', 'Please fill in your address line 1');
    client.assert.containsText('#field-error--town>span', 'Please fill in your town/city');
    client.end();
  },

  'Submit form without checking giftaid cliam should give error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'se1 7tp');
    client.click('#postcode_button');
    client.click('#field-select--addressSelect');
    client.click('#field-select--addressSelect>option:nth-child(6)');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--giftaid>span', 'To Gift Aid your donation you need to tick the checkbox');
    client.end();
  },

  'Submit form with empty mobile number should give error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'se1 7tp');
    client.click('#postcode_button');
    client.click('#field-select--addressSelect');
    client.click('#field-select--addressSelect>option:nth-child(6)');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--mobile>span', 'Please fill in your mobile number');
    client.end();
  },

  'Submit form with empty first name should scroll to firstname error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'se1 7tp');
    client.click('#postcode_button');
    client.click('#field-select--addressSelect');
    client.click('#field-select--addressSelect>option:nth-child(6)');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--firstname', 'Please fill in your first name');
    client.end();
  },

  'Submit form with empty last name should scroll to lastname error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--postcode', 'se1 7tp');
    client.click('#postcode_button');
    client.click('#field-select--addressSelect');
    client.click('#field-select--addressSelect>option:nth-child(6)');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--lastname', 'Please fill in your last name');
    client.end();
  },

  'Submit form with empty postcode should scroll to postcode error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--postcode', 'Please enter your postcode');
    client.end();
  },

  'Submit form with empty town should scroll to town error message': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementPresent('#field-label--giftaid', 1000);
    client.click('#field-label--giftaid');
    client.setValue('#field-input--mobile', '07123456789');
    client.setValue('#field-input--firstname', 'test');
    client.setValue('#field-input--lastname', 'user');
    client.setValue('#field-input--postcode', 'se1 7tp');
    client.click('a[aria-describedby=field-error--addressDetails]');
    client.pause(200);
    client.setValue('#field-input--address1', '21 test road');
    client.click('button[type=submit]');
    client.pause(2000);
    client.expect.element('div > h1').text.to.not.equal('Sorry!');
    client.assert.containsText('#field-error--town', 'Please fill in your town/city');
    client.end();
  },
};
