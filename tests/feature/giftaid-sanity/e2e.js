
module.exports = {

    '@tags': ['sanity', 'main'],

    'User completes main giftaid journey': function (client) {
        client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);

        client.page.test().fillForm(client);

        client.waitForElementVisible('div.success-wrapper--inner > h1', 1000);

        client.expect.element('div > div.success-wrapper--inner > h1').text.to.equal('Thank you,\n' + 'test!');

        client.end();
    },
};
