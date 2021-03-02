const { ErpNextTester } = require('@comicrelief/test-utils/ErpNextTester');

const erpNextTester = new ErpNextTester('', '', '', /* retries */ 20, /* sleep */ 10 * 1000);

module.exports = {

  '@tags': ['regression', 'update-erp'],

  'ERP receives a complete giftaid update': function (client)  {

    const donationType = 'single';
    const giftaid = true;
    const randomString = client.page.form().randomString();
    const lastName = 'user' + randomString;
    const email = `donate-staging-${randomString}@email.sls.comicrelief.com`;
    let transactionId;
    client.page.form().fillToPayment(client,   'https://donation-staging.spa.comicrelief.com/?providers=stripe&DISABLE_AB_TEST=1', '10', donationType, giftaid, { lastName, email });
    client.page.form().fillCardForm(client, '4242424242424242', '09 / 24', '123');

    client.pause(5000);

    client.page.form().submitMarketingPreferences(client);

    client.waitForElementVisible('.inner-content--success h1', 3500);

    client.expect.element('.inner-content--success h1').text.to.equal('Thank you, test!');

    // Fetch the transaction id from the success page
    client.getText('p.success-transactionsid', function (result) {
      transactionId = result.value.replace('Transaction ID: ', '');

    client.pause(5000);

    client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
    client.setValue('#field-input--transactionId', transactionId);
    console.log('transactionId:', transactionId);
    client.setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', lastName)
      .setValue('#field-input--emailaddress', email)
      .setValue('#field-input--postcode', 'se17tp')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('#giftAidClaimChoice>div:nth-child(2)>label')
      .click('button[type=submit]');
    client.waitForElementVisible('div.success-wrapper--inner>div>h1', 3000);
    client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal('Thank you,\n' + 'test!');

    client.perform(async (client, done) => {

      const browserIdleHandler = client.page.timeout().browserIdleHandler(client);

      console.log('Fetching donation from ERP', transactionId);
      const donation = await erpNextTester.get('Donation', transactionId);
      client.assert.equal(donation.id, transactionId, 'transactionId');
      client.assert.equal(donation.amount, 10, 'amount');
      client.assert.equal(donation.type, 'Online', 'type');
      client.assert.equal(donation.status, 'Complete', 'status');
      client.assert.equal(donation.provider, 'Stripe', 'provider');
      client.assert.equal(donation.cart_id, 'DEFAULT-COMICRELIEF', 'cartId');

      const supporter = await erpNextTester.findOne('Supporter', { filters: [{field: "first_name", value: 'test'}, {field: "last_name", value: lastName}] });

      const supporterId = supporter.name;
      console.log('Fetching supporter id from ERP:', supporterId);
      client.assert.equal(supporter.first_name, 'test', 'firstName');
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
      client.assert.equal(giftaidMandate.source, 'Giftaid Update', 'Giftaid Update');

      clearInterval(browserIdleHandler);
      const giftaidClaimId = donation.giftaid_claim;
      console.log('Fetching gift aid claim id from ERP:', giftaidClaimId);
      const giftaidClaim = await erpNextTester.get('Gift Aid Claim', giftaidClaimId);
      client.assert.equal(giftaidClaim.claimed, giftaid, 'giftaid');
      done();
    });
    client.end();
    });
  },
};
