const faker = require('faker')
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

describe('e2e test', () => {

    it('Verify title and header', () => {
        cy.visit('/')
        cy.title().should('eq', 'Gift Aid declaration | Comic Relief')
        cy.get('.giftaid-title>span').should('contain', 'Giftaid it')

    })

    it('Verify all the elements present', () => {
        cy.get('#field-input--giftaid')
        cy.get('#field-input--mobile')
        cy.get('#field-input--firstname')
        cy.get('#field-input--lastname')
        cy.get('#field-input--postcode')
        cy.get('#postcode_button')
        cy.get('button[type=submit]')
        cy.get('#field-wrapper--Email')
        cy.get('#field-wrapper--Post')
        cy.get('#field-wrapper--Phone')
        cy.get('#field-wrapper--SMS')
        cy.get('.form__row--just-in-time-block')
    })

    it('Giftaid check box field validation', () => {
        cy.get('#field-input--giftaid').click().click()
        cy.get('#field-error--giftaid>span').should('contain', 'To Gift Aid your donation you need to tick the checkbox')
        cy.get('#field-input--giftaid').click()
        cy.get('#field-error--giftaid>span').should('be.not.visible')

    })

    it('mobile no input field validation', () => {
        cy.get('#field-input--mobile').type('sdf').clear().click()
        cy.get('#field-error--mobile>span').should('contain','Please fill in your mobile number')
        cy.get('#field-input--mobile').type('sdf')
        cy.get('#field-error--mobile>span').should('contain', 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.')
        cy.get('#field-input--mobile').clear().type(faker.phone.phoneNumber('02########'))
        cy.get('#field-error--mobile>span').should('contain', 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.')
        cy.get('#field-input--mobile').clear().type(faker.phone.phoneNumber('07#########'))
        cy.get('#field-error--mobile>span').should('be.not.visible')

    })

    it('first name input field validation', () => {
        cy.get('#field-input--firstname').clear()
        cy.get('#field-input--lastname').click()
        cy.get('#field-error--firstname>span').should('contain', 'Please fill in your first name')
        cy.get('#field-input--firstname').clear().type('Test@')
        cy.get('#field-error--firstname>span').should('contain', 'This field only accepts 25 alphabetic characters and \' - ')
        cy.get('#field-input--firstname').clear().type('$&717')
        cy.get('#field-error--firstname>span').should('contain', 'This field only accepts 25 alphabetic characters and \' - ')
        cy.get('#field-input--firstname').clear().type('T\'es-t')
        cy.get('#field-error--firstname>span').should('be.not.visible')
        cy.get('#field-input--firstname').clear().type(' '+firstName)
        cy.get('#field-error--firstname>span').should('contain', 'This field only accepts 25 alphabetic characters and \' - ')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-error--firstname>span').should('be.not.visible')

    })

    it('last name input field validation', () => {
        cy.get('#field-input--lastname').clear()
        cy.get('#field-input--firstname').click()
        cy.get('#field-error--lastname>span').should('contain', 'Please fill in your last name')
        cy.get('#field-input--lastname').type('test@')
        cy.get('#field-error--lastname>span').should('contain', 'This field only accepts 25 alphanumeric characters and , . ( ) / & \' - ')
        cy.get('#field-input--lastname').type('&test')
        cy.get('#field-error--lastname>span').should('contain', 'This field only accepts 25 alphanumeric characters and , . ( ) / & \' - ')
        cy.get('#field-error--lastname>span').should('contain', 'This field only accepts 25 alphanumeric characters and , . ( ) / & \' - ')
        cy.get('#field-input--lastname').clear().type('Test-test')
        cy.get('#field-error--lastname>span').should('be.not.visible')
        cy.get('#field-input--lastname').clear().type(' '+lastName)
        cy.get('#field-error--lastname>span').should('contain', 'This field only accepts 25 alphanumeric characters and , . ( ) / & \' - ')
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-error--lastname>span').should('be.not.visible')

    })

    it('postcode field validation', () => {
        cy.get('#field-input--postcode').clear()
        cy.get('#postcode_button').click()
        cy.get('#field-error--postcode>span').should('contain','Please enter your postcode')
        cy.get('#field-input--postcode').clear().type('s66%')
        cy.get('#field-error--postcode>span').should('contain','Please enter a valid postcode')
        cy.get('#field-input--postcode').clear().type('s66')
        cy.get('#postcode_button').click()
        cy.get('#field-error--postcode>span').should('contain','Search string is not a valid postcode: s66')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
    })

    it('Verify Marketing Email Marketing preference', () => {
      cy.get('#field-wrapper--Email > div > #field-label--Yes').check().uncheck()
      cy.get('#field-wrapper--Email > div > #field-label--No').check().uncheck()
      cy.get('#field-wrapper--Email > div > #field-label--Yes').check()
      cy.get('#field-wrapper--Email > div > #field-label--No').should('not.be.checked')
      cy.get('#field-input--email').should('be.visible')
      cy.get('button[type=submit]').click()
      cy.get('#field-error--email>span').should('contain', 'Please fill in your email address')
      cy.get('#field-input--email').type('qatest@comicrelief.com')
    })


  it('verify JIT', () => {
        cy.get('.form__row--just-in-time-block>div>a').click()
        cy.contains('Name, phone number and address: we need these details to process a Gift Aid claim on your donation.')
    })

    it('verify success page', () => {
        cy.get('button[type=submit]').click().url('/success').wait(1000)
        cy.get('.success-wrapper').should('contain', 'Thank you,').and('contain', `${firstName}!`)
    })
})


describe('Ensure redirect functionality from Success page', () => {
  it('visit success page', () => {
    cy.visit('/success')
  });

  it('Redirects from success page to giftaid', () => {
    cy
      .title().should('eq', 'Gift Aid declaration | Comic Relief')
      .get('.giftaid-title>span').should('contain', 'Giftaid it')
      .get('#form > div:nth-child(1) > h2').should('contain', 'Gift aid your donation and the Government will give us 25% on top of it.')
  });

  it('Giftaid page is empty', () => {
    cy
      .get('#field-input--giftaid').should('have.value', "")
      .get('#field-input--mobile').should('have.value', "")
      .get('#field-input--firstname').should('have.value', "")
      .get('#field-input--lastname').should('have.value', "")
      .get('#field-input--postcode').should('have.value', "")
  });
});

