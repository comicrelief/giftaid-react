const faker = require('faker');

const randomString = faker.lorem.word(5);

const commands = {

  /**
   * Generate random string
   * @return {string}
   */
  randomString() {
    return Date.now().toString() + faker.lorem.word(5);
  },

  /**
   * Populate the giftaid form
   * @param client
   */
  fillForm: function (client) {
    return client
      .click('#field-label--giftaid')
      .setValue('#field-input--mobile', '07123456789')
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user' + randomString)
      .setValue('#field-input--postcode', 'se1 7tp')
      .click('a[aria-describedby=field-error--addressDetails]')
      .pause(200)
      .setValue('#field-input--address1', '21 test road')
      .setValue('#field-input--town', 'London')
      .click('button[type=submit]')
      .pause(5000);
  },

  /**
   * Populate the giftaid using postcode lookup
   * @param client
   */
  fillFormPrefilledMobile: function (client) {
    return client
      .click('#field-label--giftaid')
      .setValue('#field-input--firstname', 'test')
      .setValue('#field-input--lastname', 'user')
      .setValue('#field-input--postcode', 'se1 7tp')
      .click('#postcode_button')
      .pause(200)
      .click('#field-select--addressSelect')
      .click('#field-select--addressSelect>option:nth-child(6)')
      .click('button[type=submit]')
      .pause(5000);
  },

  /**
   * Fill the donation form to the payment section
   * @param client
   * @param baseUrl
   * @param amount
   * @param donationType
   * @param giftaid
   * @param userData
   */
  fillToPayment(client, baseUrl, amount, donationType, giftaid = false, userData = {}) {
    commands.populateFromStartToGiftAidSection(client, baseUrl, donationType, amount);

    if (typeof donationType === 'undefined' || donationType === 'single') {
      client.pause(3000);
      client.waitForElementVisible('#giving_type_selector>div>div:nth-child(1)', 5000);
      client.click('#giving_type_selector>div>div:nth-child(1)');
    }

    client.click('button#comicrelief_payinbundle_payment_amount_submit');
    if (giftaid) {
      console.log('giftaid:', giftaid);
      client.click('input#field-input--giftaid');
    }
    client
      .waitForElementVisible('#comicrelief_payinbundle_payment_card', 5000)
      .click('button#comicrelief_payinbundle_payment_card')
      .waitForElementVisible('#comicrelief_payinbundle_payment_submit', 3000);

    commands.populateFromAddressToPaymentSection(client, userData);
  },

  /**
   * Populate the donation form from the start to the giftaid section
   * @param client
   * @param baseUrl
   * @param donationType
   * @param amount
   */
  populateFromStartToGiftAidSection(client, baseUrl, donationType, amount) {
    client
      .url(baseUrl)
      .pause(5000)
      .waitForElementVisible('body', 5000, () => {
        console.log('donationType:', donationType);
        if (donationType === 'monthly') {
          client.pause(5000).click('#giving_type_selector>div>div:nth-child(2)');
        } else if (donationType === 'single' || typeof donationType === 'undefined') {
          client.pause(5000).click('#giving_type_selector>div>div:nth-child(1)');
        }
      })
      .setValue('input#field-input--amount', amount);

    return client.pause(2000);
  },

  /**
   * Populate the donation from address to payment section
   * @param client
   * @param userData
   */
  populateFromAddressToPaymentSection(
    client,
    {
      firstName = 'test',
      lastName = 'user',
      email = 'donate-staging@email.sls.comicrelief.com',
      postcode = 'sw19 1ne',
      address1 = '21 test road',
      town = 'London',
    } = {},
  ) {
    return client.pause(2000)
      .setValue('input#field-input--firstName', firstName)
      .setValue('input#field-input--lastName', lastName)
      .setValue('input#field-input--email', email)
      .pause(1000)
      .setValue('input#field-input--confirmEmail', email)
      .setValue('input#field-input--postcode', postcode)
      .click('main a.link')
      .pause(2000)
      .setValue('input#field-input--address1', address1)
      .setValue('input#field-input--town', town)
      .click('button#comicrelief_payinbundle_payment_submit')
      .pause(5000);
  },

  /**
   * Fill card form
   * @param client
   * @param cardNumber
   * @param expiration
   * @param cvc
   */
  fillCardForm(client, cardNumber, expiration, cvc) {

    return client
      .getLocationInView('label.card-number')
      .pause(1000)
      .element('css selector', 'label.card-number iframe', (frame) => {
        client.frame({ ELEMENT: Object.values(frame.value)[0] }, () => {
          client.waitForElementVisible('input[name="cardnumber"]', 3000);
          for (let i = 0; i < cardNumber.length; i += 1) {
            client.sendKeys('input[name="cardnumber"]', cardNumber.charAt(i));
          }
        });
      })
      .frame(null)
      .getLocationInView('label.expiration-date')
      .pause(2000)
      .element('css selector', 'label.expiration-date iframe', (frame) => {
        client.frame({ ELEMENT: Object.values(frame.value)[0] }, () => {
          client.waitForElementVisible('input[name="exp-date"]', 3500);
          for (let i = 0; i < expiration.length; i += 1) {
            client.sendKeys('input[name="exp-date"]', expiration.charAt(i));
          }
        });
      })
      .frame(null)
      .getLocationInView('label.cvc')
      .pause(1000)
      .element('css selector', 'label.cvc iframe', (frame) => {
        client.frame({ ELEMENT: Object.values(frame.value)[0] }, () => {
          client.waitForElementVisible('input[name="cvc"]', 3500);
          for (let i = 0; i < cvc.length; i += 1) {
            client.sendKeys('input[name="cvc"]', cvc.charAt(i));
          }
        });
      })
      .frame(null)
      .pause(2000)
      .click('button#comicrelief_payinbundle_payment_amount_submit')
      .pause(15000);
  },

  /**
   * Submit the marketing preferences form to the thank you section
   * @param client
   */
  submitMarketingPreferences(client) {
    client.pause(3000);

    client.waitForElementVisible('.marketing-pref-form h1', 10000);

    client.click('.form__step--marketing-pref--bottom>button');

    client.pause(10000);
  },

};

module.exports = {
    commands: [commands],
};
