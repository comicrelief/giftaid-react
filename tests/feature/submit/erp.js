const { ErpNextTester } = require('@comicrelief/test-utils/ErpNextTester');

const erpNextTester = new ErpNextTester('', '', '', /* retries */ 20, /* sleep */ 10 * 1000);

const faker = require('faker');
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const mobile = faker.phone.phoneNumber('07#########');

module.exports = {

  '@tags': ['regression', 'submit-erp'],


  'ERP receives a complete giftaid submit': function (client)  {
    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.click('#field-label--giftaid')
      .setValue('#field-input--mobile', mobile)
      .setValue('#field-input--firstname', firstName)
      .setValue('#field-input--lastname', lastName)
      .setValue('#field-input--postcode', 'se1 7tp')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('button[type=submit]')
      .pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      `${firstName}!`);

    client.perform(async (client, done) => {

      const browserIdleHandler = client.page.timeout().browserIdleHandler(client);


      const supporter = await erpNextTester.findOne('Supporter', { filters: [{field: "first_name", value: firstName}, {field: "last_name", value: lastName}] });

      const supporterId = supporter.name;
      console.log('Fetching supporter id from ERP:', supporterId);
      client.assert.equal(supporter.first_name, firstName, 'firstName');
      client.assert.equal(supporter.last_name, lastName, 'lastName');

      const giftaidMandate = await erpNextTester.findOne('Gift Aid Mandate', {
        fields: ['*'],
        filters: [
          {
            field: 'supporter',
            value: supporterId,
          },
        ],
      });
      const giftaidMandateId = giftaidMandate.name;
      console.log('Fetching gift aid mandate id from ERP:', giftaidMandateId);
      client.assert.equal(giftaidMandate.supporter, supporterId, 'supporterId');
      client.assert.equal(giftaidMandate.source, 'Giftaid Submit', 'Giftaid Submit');
      clearInterval(browserIdleHandler);

      done();
    });
    client.end();
  },

};
