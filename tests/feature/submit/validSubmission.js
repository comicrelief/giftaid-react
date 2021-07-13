module.exports = {

  '@tags': ['sanity', 'submit', 'validSubmission'],

  'User submits giftaid without marketing preferences selection': function (client) {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.page.form().fillForm(client);
    client.click('button[type=submit]');
    client.pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      'test!');
    client.end();
  },

  'User completes main giftaid journey from link with token': function (client) {
    client.url(process.env.BASE_URL + 'uX8R5SzcKfk=').maximizeWindow().waitForElementVisible('body', 1000);
    client.page.form().fillFormPrefilledMobile(client);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      'test!');
    client.end();
  },
};
