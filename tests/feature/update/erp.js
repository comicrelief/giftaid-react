const { ErpNextTester } = require('@comicrelief/test-utils/ErpNextTester');

const erpNextTester = new ErpNextTester('', '', '', /* retries */ 20, /* sleep */ 10 * 1000);

const tests = {};
[false, true].forEach((giftaid) => {
  tests[`ERP receives a complete giftaid update (${!giftaid ? 'un' : ''}claim)`] = function (client)  {
    const donationType = 'single';
    const randomString = client.page.form().randomString();
    const lastName = 'user' + randomString;
    const email = `donate-staging-${randomString}@email.sls.comicrelief.com`;
    let transactionId;
    let supporterId;
    client.page.form().fillToPayment(
      client,
      'https://donation-staging.spa.comicrelief.com/?providers=stripe&DISABLE_AB_TEST=1',
      '10',
      donationType,
      !giftaid, // set transaction with a different giftaid option initially.
      { lastName, email },
    );
    client.page.form().fillCardForm(client, '4242424242424242', '09 / 24', '123');

    client.pause(5000);

    client.page.form().submitMarketingPreferences(client);

    client.waitForElementVisible('.inner-content--success h1', 3500);

    client.expect.element('.inner-content--success h1').text.to.equal('Thank you, test!');

    // Fetch the transaction id from the success page
    client.getText('p.success-transactionsid', function (result) {
      transactionId = result.value.replace('Transaction ID: ', '');
      console.log('transactionId:', transactionId);
    });

    client.perform(async (done) => {
      try {
        console.log('Fetching donation from ERP', transactionId);
        const donation = await erpNextTester.get('Donation', transactionId);

        client.assert.equal(donation.id, transactionId, 'transactionId');
        client.assert.equal(donation.amount, 10, 'amount');
        // comment out this line until issue is fixed with types
        // client.assert.equal(donation.type, 'Online', 'type');
        client.assert.equal(donation.status, 'Complete', 'status');
        client.assert.equal(donation.provider, 'Stripe', 'provider');
        client.assert.equal(donation.cart_id, 'DEFAULT-COMICRELIEF', 'cartId');

        console.log('Fetching supporter from ERP');
        const supporter = await erpNextTester.findOne('Supporter', { filters: [{field: "first_name", value: 'test'}, {field: "last_name", value: lastName}] });

        supporterId = supporter.name;
        console.log('supporterId', supporterId);
        client.assert.equal(supporter.first_name, 'test', 'firstName');
        client.assert.equal(supporter.last_name, lastName, 'lastName');

        client.url(process.env.BASE_URL + 'update').maximizeWindow().waitForElementVisible('body', 1000);
        client.setValue('#field-input--transactionId', transactionId);
        client.setValue('#field-input--firstname', 'test')
          .setValue('#field-input--lastname', lastName)
          .setValue('#field-input--email', email)
          .setValue('#field-input--postcode', 'se17tp')
          .click('a[aria-describedby=field-error--addressDetails]')
          .pause(200)
          .setValue('#field-input--address1', '21 test road')
          .setValue('#field-input--town', 'London')
          .click(`#giftAidClaimChoice>div:nth-child(${giftaid ? 2 : 3})>label`)
          .click('button[type=submit]');
        client.waitForElementVisible('div.success-wrapper--inner>div>h1', 3000);
        const thankYouMessage = giftaid ? 'Thank you,\ntest!' : 'Thanks for letting us know';
        client.expect.element('div.success-wrapper--inner>div>h1').text.to.equal(thankYouMessage);

        console.log('Fetching giftaid mandate from ERP');
        const giftaidMandate = await erpNextTester.findOne('Gift Aid Mandate', {
          filters: [
            {
              field: 'supporter',
              value: supporterId,
            },
            {
              field: 'source',
              value: 'Giftaid Update', // to avoid fetching original mandate
            },
          ],
        });
        console.log('giftaidMandateId', giftaidMandate.name);
        client.assert.equal(giftaidMandate.supporter, supporterId, 'supporterId');

        console.log('Fetching gift aid claim id from ERP');
        const giftaidClaim = await erpNextTester.findOne('Gift Aid Claim', {
          filters: [
            {
              field: 'supporter',
              value: supporterId,
            },
            {
              field: 'mandate',
              value: giftaidMandate.name,
            },
            {
              field: 'donation',
              value: transactionId,
            },
          ],
        });
        console.log('giftaidClaimId', giftaidClaim.name);
        client.assert.equal(giftaidClaim.claimed, giftaid, 'giftaid');
      } catch(error) {
        client.assert.fail(error);
      }
      done();
    });
    client.end();
  }
});

module.exports = {

  '@tags': ['regression', 'update-erp'],

  '@disabled': true,

  ...tests,

};
