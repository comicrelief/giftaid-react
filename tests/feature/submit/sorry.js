module.exports = {

  '@tags': ['sanity', 'submit', 'sorry'],

  'Verify sorry page': function (client) {
    client.url(process.env.BASE_URL + 'sorry').maximizeWindow().waitForElementVisible('body', 1000);
    client.waitForElementVisible('div > h1', 1000);
    client.expect.element('div > h1').text.to.equal('Sorry!');
    client.expect.element('div>p:nth-child(1)').text.to.equal('We’re really sorry, but with people across the UK rushing to Gift Aid their text donation, our site is a bit overwhelmed and has had to have a lie down.');
    client.end();
  },
};
