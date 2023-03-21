/**
 * Giftaid - tests
 *
*/

const faker = require('faker');
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const successUrl = '/update/success';
const giftAidChecked = ( Math.random() > 0.5 ) ? '1' : '0';
const transactionIdErrorMessage = 'This transaction ID doesn\'t seem to be valid, please check your donation confirmation email or letter';
const successYesMessage = 'We’ve registered your Gift Aid declaration.';
const successNoMessage = 'We won’t claim Gift Aid for your donation';

describe('e2e test typing transaction ID and choosing "yes" to claim gift aid on donation', () => {
  it('Verify title and header', () => {
    cy.visit('/update');
    cy.title().should('eq', 'Gift Aid declaration | Comic Relief');
    cy.get('.giftaid-title>span').should('contain', 'Giftaid it');
    cy.get('#form > div:nth-child(1) > h2').should('contain', 'Edit your Gift Aid declaration');
    cy.get('#form > div.form-fields--wrapper > h3').should('contain','Who is changing their declaration?')
  });

  it('Verify all the elements present', () => {
    cy.get('#field-input--transactionId');
    cy.get('#field-input--firstname');
    cy.get('#field-input--lastname');
    cy.get('#field-input--emailaddress');
    cy.get('#field-input--postcode');
    cy.get('#postcode_button');
    cy.get('a[aria-describedby=field-error--addressDetails]');
    cy.get('#giftAidClaimChoice > div:nth-child(2) > span');
    cy.get('#giftAidClaimChoice > div:nth-child(3) > span');
    cy.get('#form > button');
    cy.get('.form__row--just-in-time-block')
  });

  it('Transaction ID input field validation', () => {
    cy.get('#field-input--transactionId').clear();
    cy.get('#field-input--firstname').click();
    cy.get('#field-error--transactionId > span').should('contain','Please fill in your transaction id');
    cy.get('#field-input--transactionId').type('#£$^');
    cy.get('#field-error--transactionId > span').should('contain',transactionIdErrorMessage);
    cy.get('#field-input--transactionId').clear().type('1234');
    cy.get('#field-error--transactionId > span').should('contain',transactionIdErrorMessage);
    cy.get('#field-input--transactionId').clear().type('d-BEXd501');
    cy.get('#field-error--transactionId > span').should('not.exist');
    cy.get('#field-input--transactionId').clear().type('D-BEX1501');
    cy.get('#field-error--transactionId > span').should('not.exist');
    cy.get('#field-input--transactionId').clear().type('test');
    cy.get('#field-error--transactionId > span').should('contain',transactionIdErrorMessage);
    cy.get('#field-input--transactionId').clear().type('3D487A59-716B-440D-BD43-50ED301DD9BA');
    cy.get('#field-error--transactionId > span').should('not.exist');
    cy.get('#field-input--transactionId').clear().type('5c6a89f170022');
    cy.get('#field-error--transactionId > span').should('not.exist')
  });

  it('first name input field validation', () => {
    cy.get('#field-input--firstname').clear();
    cy.get('#field-input--lastname').click();
    cy.get('#field-error--firstname>span').should('contain', 'Please fill in your first name');
    cy.get('#field-input--firstname').clear().type('Test@');
    cy.get('#field-error--firstname>span').should('contain', 'This field only accepts alphabetic characters and \' - ');
    cy.get('#field-input--firstname').clear().type('$&717');
    cy.get('#field-error--firstname>span').should('contain', 'This field only accepts alphabetic characters and \' - ');
    cy.get('#field-input--firstname').clear().type('T\'es-t');
    cy.get('#field-error--firstname>span').should('not.exist');
    cy.get('#field-input--firstname').clear().type(' '+firstName);
    cy.get('#field-error--firstname>span').should('contain', 'This field only accepts alphabetic characters and \' - ');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-error--firstname>span').should('not.exist')
  });

  it('last name input field validation', () => {
    cy.get('#field-input--lastname').clear();
    cy.get('#field-input--firstname').click();
    cy.get('#field-error--lastname>span').should('contain', 'Please fill in your last name')
    cy.get('#field-input--lastname').type('test@');
    cy.get('#field-error--lastname>span').should('contain', 'This field only accepts alphanumeric characters and , . ( ) / & \' - ');
    cy.get('#field-input--lastname').clear().type('Test-test');
    cy.get('#field-error--lastname>span').should('not.exist');
    cy.get('#field-input--lastname').clear().type(' '+lastName);
    cy.get('#field-error--lastname>span').should('contain', 'This field only accepts alphanumeric characters and , . ( ) / & \' - ');
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-error--lastname>span').should('not.exist')
  });

  it('email input field validation', () => {
    cy.get('#field-input--emailaddress').clear().type('test-@%comicrelief.com');
    cy.get('#field-error--emailaddress > span').should('contain','Please fill in a valid email address');
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-error--emailaddress > span').should('not.exist')
  });

  it('postcode field validation', () => {
    cy.get('#postcode_button').click();
    cy.get('#field-error--postcode>span').should('contain','No postcode provided');
    cy.get('#field-input--postcode').clear().type('s66%');
    cy.get('#field-error--postcode>span').should('contain','Please enter a valid postcode');
    cy.get('#field-input--postcode').clear().type('s66');
    cy.get('#field-error--postcode>span').should('contain','Please enter a valid postcode');
    cy.get('#field-input--postcode').clear().type('se1 7tp');
    cy.get('button[type=submit]').click();

    cy.get('#field-error--addressDetails > span').should('contain','Please fill in your address');

    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
  });

  it('address fields validation', () => {
    cy.get('a[aria-describedby=field-error--addressDetails]').should('be.visible');
    cy.get('#field-input--address1').clear().type('test%£');
    cy.get('#field-error--address1 > span').should('contain','This field only accepts alphanumeric characters and \' . - & _ /');
    cy.get('#field-input--address1').clear().type('112 ST. AGNELLS LANE');
    cy.get('#field-error--address1 > span').should('not.exist');
    cy.get('#field-input--town').should('be.visible');
    cy.get('#field-input--town').clear().type('London&*');
    cy.get('#field-error--town > span').should('contain','This field only accepts alphanumeric characters and \' . - & _ /');
    cy.get('#field-input--town').clear().type('HEMEL HEMPSTEAD');
    cy.get('#field-error--town > span').should('not.exist')
  });

  it('verify Your Gift Aid declaration',() => {
    cy.get('#form > div:nth-child(3) > h3').should('contain','Your Gift Aid declaration');
    cy.get('#giftAidClaimChoice > legend').should('contain','Can we claim Gift Aid on your donation?');
    cy.get('button[type=submit]').click();
    cy.get('#field-error--giftAidClaimChoice > span').should('contain','This field is required');
    cy.get('input[type="radio"]').check('1').should('be.checked');
    cy.get('#field-error--giftAidClaimChoice > span').should('not.exist')
  });

  it('verify JIT', () => {
    cy.get('.form__row--just-in-time-block>div>a').click();
    cy.contains('Name, email and address: we need this information to identify your donation and update the gift aid status on your donation.');
    cy.contains('We will only use your phone number to match your SMS donations to your gift aid status.')
  });

  it('clear email field', () => {
    cy.get('#field-input--emailaddress').clear()
  });

  it('verify success page', () => {
    cy.get('button[type=submit]').click().url('/success').wait(5000);
    cy.get('.success-wrapper').should('contain', 'Thank you,').and('contain', `${firstName}!`)
    cy.get('div.success-wrapper--inner > div > p').should('contain',successYesMessage)
  })
 });

describe('e2e test typing transaction ID and choosing "No" to claim gift aid on donation', () => {

  it('verify copy on thank you page when user declares no on giftaid declaration', () => {
    cy.visit('/update');
    cy.get('#field-input--transactionId').clear().type('2D487A59-716B-440D-BD43-50ED301DD9BA');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE');
    cy.get('input[type="radio"]').check('0').should('be.checked');
    cy.get('button[type=submit]').click().url('/success');
    cy.contains('Thanks for letting us know');
    cy.get('div.success-wrapper--inner > div > p').should('contain', successNoMessage)
  })
});

describe('Giftaid test when user comes from sms,online or call centre', () => {

  //sms
  it('e2e test when user comes from sms', () => {
    cy.visit('/update/3D787A59-716B-440D-BD23-50ED301DD9BA');
    cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration');
    cy.get('p.transaction-id').should('contain','Transaction ID: 3D787A59-716B-440D-BD23-50ED301DD9BA');
    cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?');
    cy.get('input[type="radio"]').check('sms').should('be.checked');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE');
    cy.get('input[type="radio"]').check('1').should('be.checked');
    cy.get('button[type=submit]').click().url('/success');
    cy.get('.success-wrapper').should('contain', 'Thank you,').and('contain', `${firstName}!`);
    cy.get('div.success-wrapper--inner > div > p').should('contain',successYesMessage)
  });

  //online
  it('e2e test when user comes from online', () => {
    cy.visit('/update/bb9aa5c9-5d93-4a34-a102-aaf378d16a73');
    cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration');
    cy.get('p.transaction-id').should('contain','Transaction ID: bb9aa5c9-5d93-4a34-a102-aaf378d16a73');
    cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?');
    cy.get('input[type="radio"]').check('online').should('be.checked');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE');
    cy.get('input[type="radio"]').check('1').should('be.checked');
    cy.get('button[type=submit]').click().url('/success');
    cy.get('.success-wrapper').should('contain', 'Thank you,').and('contain', `${firstName}!`);
    cy.get('div.success-wrapper--inner > div > p').should('contain',successYesMessage)
  });

  //call centre
  it('e2e test when user comes from call centre', () => {
    cy.visit('/update');
    cy.title().should('eq', 'Gift Aid declaration | Comic Relief');
    cy.get('.giftaid-title>span').should('contain', 'Giftaid it');
    cy.get('#form > div:nth-child(1) > h2').should('contain', 'Edit your Gift Aid declaration');
    cy.get('#form > div.form-fields--wrapper > h3').should('contain','Who is changing their declaration?');
    cy.get('#field-input--transactionId').clear().type('5c6a9920355f6');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE');
    cy.get('input[type="radio"]').check('1').should('be.checked');
    cy.get('button[type=submit]').click().url('/success');
    cy.get('.success-wrapper').should('contain', 'Thank you,').and('contain', `${firstName}!`);
    cy.get('div.success-wrapper--inner > div > p').should('contain',successYesMessage)
  });

  it('verify social links', () => {
    cy.get('footer li a[title=facebook]');
    cy.get('footer li a[title=twitter]');
    cy.get('footer li a[title=youtube]');
    cy.get('footer li a[title=instagram]')
  });

  it('verify footer menu', () => {
    cy.visit('/update');
    cy.get('footer nav.menu--footer ul li a[href*="https://www.comicrelief.com/contact-us"]').should('contain', 'Contact us')
  });

  it('Verify footer copyright', () => {
    cy.visit('/update')
      .get('footer div.footer__copyright > p').should('be.visible').should('contain', 'Comic Relief is the trading name of Charity Projects, a registered charity in England and Wales (326568) and Scotland (SC039730),')
  })
});

describe('Ensure redirect functionality from Success page', () => {
  it('visit success page', () => {
    cy.visit('/update/success')
  });

  it('Redirects from success page to giftaid', () => {
    cy
      .title().should('eq', 'Gift Aid declaration | Comic Relief')
      .get('.giftaid-title>span').should('contain', 'Giftaid it')
      .get('#form > div:nth-child(1) > h2').should('contain', 'Edit your Gift Aid declaration')
      .get('#form > div.form-fields--wrapper > h3').should('contain','Who is changing their declaration?')
  });

  it('Giftaid page is empty', () => {
    cy
      .get('#field-input--transactionId').should('have.value', "")
      .get('#field-input--firstname').should('have.value', "")
      .get('#field-input--lastname').should('have.value', "")
      .get('#field-input--emailaddress').should('have.value', "")
      .get('#field-input--postcode').should('have.value', "")
  });
});

describe('Ensure url validation if string is less than 5 characters', () => {
  it('validate invalid string / non UUID in url', () => {
    cy.visit('/update/test');
    cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration');
    cy.get('p.transaction-id').should('contain','Transaction ID: test');
    cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?');
    cy.get('input[type="radio"]').check('online').should('be.checked');
    cy.get('#field-input--firstname').clear().type(firstName);
    cy.get('#field-input--lastname').clear().type(lastName);
    cy.get('#field-input--emailaddress').clear().type('giftaid-staging@email.sls.comicrelief.com');
    cy.get('#field-input--postcode').clear().type('hp2 6lq');
    cy.get('#postcode_button').click();
    cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE');
    cy.get('input[type="radio"]').check(giftAidChecked).should('be.checked');
    cy.get('button[type=submit]').click();
    cy.get('#field-error--urlTransID > span').should('contain',transactionIdErrorMessage)
  })
});

