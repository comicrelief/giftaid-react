module.exports = {

    '@tags': ['sanity'],

    'Verify all the elements present': function (client) {

        client
            .url(process.env.BASE_URL)
            .waitForElementVisible('body', 1000)
            .assert.title('Gift Aid declaration | Comic Relief');

            client.end();

    },

};
