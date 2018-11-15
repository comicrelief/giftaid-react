
module.exports = {

    '@tags': ['sanity', 'main'],

    'User completes main giftaid journey': function (client) {
        client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);

        client.page.mainGA().fillForm(client);

        client.waitForElementVisible('div.success-wrapper--inner > h1', 1000);

        client.expect.element('div > div.success-wrapper--inner > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },

    'User completes giftaid update journey': function (client) {
        client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);

        client.setValue('#field-input--transactionId', '3D487A59-716B-440D-BD43-50ED301DD9BA');

        client.page.updateGA().fillFormUpdateYes(client);

        client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);

        client.expect.element('div.success-wrapper--inner > div > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },

    'User completes giftaid update journey from sms': function (client) {
        client.url(process.env.BASE_URL + 'update/transID').maximizeWindow().waitForElementVisible('body', 1000);

        client.click('input[type="radio"][value="sms"]');

        client.page.updateGA().fillFormUpdateYes(client);

        client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);

        client.expect.element('div.success-wrapper--inner > div > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },

    'User completes giftaid update journey from online': function (client) {
        client.url(process.env.BASE_URL + 'update/transID').maximizeWindow().waitForElementVisible('body', 1000);

        client.click('input[type="radio"][value="online"]');

        client.page.updateGA().fillFormUpdateYes(client);

        client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);

        client.expect.element('div.success-wrapper--inner > div > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },

    'User completes giftaid update journey from call centre': function (client) {
        client.url(process.env.BASE_URL + 'update/transID').maximizeWindow().waitForElementVisible('body', 1000);

        client.click('input[type="radio"][value="callcentre"]');

        client.page.updateGA().fillFormUpdateYes(client);

        client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);

        client.expect.element('div.success-wrapper--inner > div > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },

    'User selects "no" for giftaid update declaration': function (client) {
        client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);

        client.setValue('#field-input--transactionId', 'D-BEX1501');

        client.page.updateNo().fillFormUpdateNo(client);

        client.waitForElementVisible('div.success-wrapper--inner > div > h1', 1000);

        client.expect.element('div.success-wrapper--inner > div > h1').text.to.equal('Thanks for letting us know');

        client.end();
    },

    'Verify sorry page': function (client) {
        client.url(process.env.BASE_URL + 'sorry').maximizeWindow().waitForElementVisible('body', 1000);

        client.waitForElementVisible('div > h1', 1000);

        client.expect.element('div > h1').text.to.equal('Sorry!');

        client.end();
    },
};
