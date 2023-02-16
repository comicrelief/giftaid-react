const axios = require('axios');
const faker = require('faker');

const {
  CONTACT_SERVICE_MARKETING_PREFERENCES_REPORTING_BASE_URL: reportingUrl,
  CONTACT_SERVICE_REPORTING_API_KEY: apiKey,
} = process.env;

const testData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  mobile: faker.phone.phoneNumber('07#########'),
  phone: faker.phone.phoneNumber('0208#######'),
  address1: faker.address.streetName(),
  address2: faker.address.streetAddress(),
  address3: faker.address.city(),
  postcode: 'SE17TP',
  town: faker.address.county(),
  country: 'GB',
};

module.exports = {

  '@tags': ['sanity', 'submit', 'marketingPreferencesData'],

  'Verify marketing preferences data': function (client) {

    const randomString = faker.lorem.word(5);

    const email = `giftaid-staging-${randomString}@email.sls.comicrelief.com`;

    client.url(process.env.BASE_URL).maximizeWindow().waitForElementVisible('body', 1000);
    client.click('#field-label--giftaid')
      .setValue('#field-input--mobile', testData.mobile)
      .setValue('#field-input--firstname', testData.firstName)
      .setValue('#field-input--lastname', testData.lastName)
      .setValue('#field-input--postcode', testData.postcode)
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', testData.address1)
      .setValue('#field-input--address2', testData.address2)
      .setValue('#field-input--address3', testData.address3)
      .setValue('#field-input--town', testData.town);

    // marketing preferences
    // email
    client.waitForElementVisible('#field-wrapper--Email', 1000);
    // yes for email
    client.click('#field-wrapper--Email>div:nth-child(1)');
    client.assert.elementPresent('#field-input--email');
    client.setValue('#field-input--email', email);

    // yes for Post
    client.waitForElementVisible('#field-wrapper--Post', 1000);
    client.click('#field-wrapper--Post div:nth-child(1)');

    // Phone - accepts both mobile & telephone numbers
    client.waitForElementVisible('#field-wrapper--Phone', 1000);

    // Yes option
    client.click('#field-wrapper--Phone div:nth-child(1)');
    client.setValue('input#field-input--phone', testData.phone);

    // SMS
    client.waitForElementVisible('#field-wrapper--SMS', 1000);
    client.click('#field-wrapper--SMS div:nth-child(1)');

    // submit form
    client.click('button[type=submit]');
    client.pause(5000);
    client.waitForElementVisible('div > h1', 2000);
    client.expect.element('div > h1').text.to.equal('Thank you,\n' +
      `${testData.firstName}!`);

    // Wait for the data to be ingested
    client.pause(30000);

    // get MP data
    client.perform((done) => {
      axios.get(`${reportingUrl}/marketing-preferences/${email}`, { headers: { 'x-api-key': apiKey } })
        .then((response) => {
          const { data: { data } } = response;

            client.assert.equal(response.status, 200, '200 OK');
            client.assert.equal(data.campaign, 'YRW', 'campaignCode');
            client.assert.equal(data.firstname, testData.firstName, 'firstName');
            client.assert.equal(data.lastname, testData.lastName, 'lastName');
            client.assert.equal(data.email, email, 'email');
            client.assert.equal(data.phone, testData.phone, 'phone');
            client.assert.equal(data.mobile, testData.mobile, 'mobile');
            client.assert.equal(data.address1, testData.address1, 'address1');
            client.assert.equal(data.address2, testData.address2, 'address2');
            client.assert.equal(data.address3, testData.address3, 'address3');
            client.assert.equal(data.town, testData.town, 'town');
            client.assert.equal(data.country, testData.country, 'country');
            client.assert.equal(data.transsource, 'YRW_GiftAid', 'transsource');
            client.assert.equal(data.transsourceurl, process.env.BASE_URL, 'transsourceurl');
            client.assert.equal(data.transtype, 'prefs', 'transtype');
            client.assert.equal(data.permissionemail, '1', 'permissionemail');
            client.assert.equal(data.permissionphone, '1', 'permissionphone');
            client.assert.equal(data.permissionpost, '', 'permissionpost');
            client.assert.equal(data.permissionsms, '', 'permissionsms');
            done();
          })
          .catch((error) => {
            console.log(error);
            client.assert.fail(error.message);
            done();
          });
        });
    client.end();
  },
};
