/** 
 * Giftaid - tests
 *
*/

const faker = require('faker')
var fname

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
        cy.get('#field-input--firstname').type(fname=faker.name.firstName())
        cy.get('#field-error--firstname>span').should('be.not.visible')

    })

    it('last name input field validation', () => {
        cy.get('#field-input--lastname').clear()
        cy.get('#field-input--firstname').click()
        cy.get('#field-error--lastname>span').should('contain', 'Please fill in your last name')
        cy.get('#field-input--lastname').type(faker.name.lastName())
        cy.get('#field-error--lastname>span').should('be.not.visible')

    })

    it('postcode field validation', () => {
        cy.get('#field-input--postcode').clear()
        cy.get('#postcode_button').click()
        cy.get('#field-error--postcode>span').should('contain','No postcode provided')
        cy.get('#field-input--postcode').clear().type('s66')
        cy.get('#field-error--postcode>span').should('contain','Please enter a valid postcode')
        cy.get('#postcode_button').click()
        cy.get('#field-error--postcode>span').should('contain','Search string is not a valid postcode: s66')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
    })

    it('verify JIT', () => {
        cy.get('.form__row--just-in-time-block>div>a').click()
        cy.contains('Name, email and billing address: we need it to create a receipt for your payment and send it to you.')
        cy.contains('Phone number: we collect it in case there is an issue with gift aid donation.')
    })

    it('verify success page', () => {
        cy.get('button[type=submit]').click().url('/success')
        cy.contains(`Thank you, ${fname}!`)
    })
})
