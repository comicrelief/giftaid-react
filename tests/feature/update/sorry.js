module.exports = {

  '@tags': ['sanity', 'update', 'sorry'],

  'Verify update sorry page': function (client) {
    client.url(process.env.BASE_URL + 'update/sorry').maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementVisible('div > h1', 1000);
    client.expect.element('div > h1').text.to.equal('Sorry!');
    client.expect.element('div>p:nth-child(1)').text.to.equal('We aren’t able to process your Gift Aid update request at the moment.');
    client.end();
  },
};
