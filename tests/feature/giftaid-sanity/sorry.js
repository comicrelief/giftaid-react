module.exports = {

 '@tags': ['sanity', 'sorry'],

   'Verify sorry page': function (client) {
     client.url(process.env.BASE_URL + 'sorry').maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementVisible('div > h1', 1000);
     client.expect.element('div > h1').text.to.equal('Sorry!');
     client.expect.element('p:nth-child(2)').text.to.equal('We’re really sorry, but with people across the UK rushing to Gift Aid their text donation, our site is a bit overwhelmed and has had to have a lie down.');
     client.end();
    },

   'Verify update sorry page': function (client) {
     client.url(process.env.BASE_URL + 'update/sorry').maximizeWindow().waitForElementVisible('body', 1000);
     client.waitForElementVisible('div > h1', 1000);
     client.expect.element('div > h1').text.to.equal('Sorry!');
     client.expect.element('p:nth-child(2)').text.to.equal('We aren’t able to process your Gift Aid update request at the moment.');
     client.end();
    }
}
