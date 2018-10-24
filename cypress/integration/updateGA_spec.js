/**
 * Giftaid - tests
 *
*/

const faker = require('faker')
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

describe('e2e test typing transaction ID and choosing "yes" to claim gift aid on donation', () => {

    it('Verify title and header', () => {
        cy.visit('/update')
        cy.title().should('eq', 'Gift Aid declaration | Comic Relief')
        cy.get('.giftaid-title>span').should('contain', 'Giftaid it')
        cy.get('#form > div:nth-child(1) > h2').should('contain', 'Edit your Gift Aid declaration')
        cy.get('#form > div.form-fields--wrapper > h3').should('contain','Who is changing their declaration?')
    })

    it('Verify all the elements present', () => {
        cy.get('#field-input--transactionId')
        cy.get('#field-input--firstname')
        cy.get('#field-input--lastname')
        cy.get('#field-input--emailaddress')
        cy.get('#field-input--postcode')
        cy.get('#postcode_button')
        cy.get('a[aria-describedby=field-error--addressDetails]')
        cy.get('#giftAidClaimChoice > div:nth-child(2) > span')
        cy.get('#giftAidClaimChoice > div:nth-child(3) > span')
        cy.get('#form > button')
        cy.get('.form__row--just-in-time-block')
    })

    it('Transaction ID input field validation', () => {
        cy.get('#field-input--transactionId').clear()
        cy.get('#field-input--firstname').click()
        cy.get('#field-error--transactionId > span').should('contain','Please fill in your transaction id')
        cy.get('#field-input--transactionId').type('#£$^')
        cy.get('#field-error--transactionId > span').should('contain','This does not match a transaction ID in our system, please check your donation confirmation email or letter')
        cy.get('#field-input--transactionId').clear().type('d-BEXd501')
        cy.get('#field-error--transactionId > span').should('contain','This does not match a transaction ID in our system, please check your donation confirmation email or letter')
        cy.get('#field-input--transactionId').clear().type('D-BEX1501')
        cy.get('#field-error--transactionId > span').should('be.not.visible')
        cy.get('#field-input--transactionId').clear().type('f01453C4-%64C-4C11-9748-C*AA81A37696C')
        cy.get('#field-error--transactionId > span').should('contain','This does not match a transaction ID in our system, please check your donation confirmation email or letter')
        cy.get('#field-input--transactionId').clear().type('3D487A59-716B-440D-BD43-50ED301DD9BA')
        cy.get('#field-error--transactionId > span').should('be.not.visible')
    })

    it('first name input field validation', () => {
        cy.get('#field-input--firstname').clear()
        cy.get('#field-input--lastname').click()
        cy.get('#field-error--firstname>span').should('contain', 'Please fill in your first name')
        cy.get('#field-input--firstname').clear().type('test$%')
        cy.get('#field-error--firstname>span').should('contain', 'This field only accepts alphanumeric characters and \' . - & _')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-error--firstname>span').should('be.not.visible')
    })

    it('last name input field validation', () => {
        cy.get('#field-input--lastname').clear()
        cy.get('#field-input--firstname').click()
        cy.get('#field-error--lastname>span').should('contain', 'Please fill in your last name')
        cy.get('#field-input--lastname').clear().type('test$%')
        cy.get('#field-error--lastname>span').should('contain', 'This field only accepts alphanumeric characters and \' . - & _')
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-error--lastname>span').should('be.not.visible')
    })

    it('Email input field validation', () => {
        cy.get('#field-input--emailaddress').clear().click()
        cy.get('#field-input--postcode').click()
        cy.get('#field-error--emailaddress > span').should('contain','Please fill in your email address')
        cy.get('#field-input--emailaddress').clear().type('test-@%comicrelief.com')
        cy.get('#field-error--emailaddress > span').should('contain','Please fill in a valid email address')
        cy.get('#field-input--emailaddress').clear().type('test@comicrelief.com')
        cy.get('#field-error--emailaddress > span').should('be.not.visible')
    })

    it('postcode field validation', () => {
        cy.get('#field-error--postcode>span').should('contain','Please enter your postcode')
        cy.get('#field-input--postcode').clear().type('s66%')
        cy.get('#field-error--postcode>span').should('contain','Please enter a valid postcode')
        cy.get('#field-input--postcode').clear().type('s66')
        cy.get('#postcode_button').click()
        cy.get('#field-error--postcode>span').should('contain','Search string is not a valid postcode: s66')
        cy.get('#field-input--postcode').clear().type('se1 7tp')
        cy.get('button[type=submit]').click()

        cy.get('#field-error--addressDetails > span').should('contain','Please fill in your address')

        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
    })

    it('address fields validation', () => {
        cy.get('a[aria-describedby=field-error--addressDetails]').should('be.visible')
        cy.get('#field-input--address1').clear().type('test%£')
        cy.get('#field-error--address1 > span').should('contain','This field only accepts alphanumeric characters and \' . - & _ /')
        cy.get('#field-input--address1').clear().type('112 ST. AGNELLS LANE')
        cy.get('#field-error--address1 > span').should('be.not.visible')
        cy.get('#field-input--town').should('be.visible')
        cy.get('#field-input--town').clear().type('London&*')
        cy.get('#field-error--town > span').should('contain','This field only accepts alphanumeric characters and \' . - & _ /')
        cy.get('#field-input--town').clear().type('HEMEL HEMPSTEAD')
        cy.get('#field-error--town > span').should('be.not.visible')
    })

    it('verify Your Gift Aid declaration',() => {
        cy.get('#form > div:nth-child(3) > h3').should('contain','Your Gift Aid declaration')
        cy.get('#giftAidClaimChoice > legend').should('contain','Can we claim Gift Aid on your donation?')
        cy.get('button[type=submit]').click()
        cy.get('#field-error--giftAidClaimChoice > span').should('contain','This field is required')
        cy.get('input[type="radio"]').check('1').should('be.checked')
        cy.get('#field-error--giftAidClaimChoice > span').should('be.not.visible')
    })

    it('verify JIT', () => {
        cy.get('.form__row--just-in-time-block>div>a').click()
        cy.contains('Name, email and address: we need this information to identify your donation and update the gift aid status on your donation.')
        cy.contains('We will only use your phone number to match your SMS donations to your gift aid status.')
    })

    it('verify success page', () => {
        cy.get('button[type=submit]').click().url('/success')
        cy.contains(`Thank you, ${firstName}!`)
        cy.get('div.success-wrapper--inner > div > p').should('contain','We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational costs.')
    })
 })

describe('e2e test typing transaction ID and choosing "No" to claim gift aid on donation', () => {

    it('verify copy on thank yoy page when user declares no on giftaid declaration', () => {
        cy.visit('/update')
        cy.get('#field-input--transactionId').clear().type('2D487A59-716B-440D-BD43-50ED301DD9BA')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-input--emailaddress').clear().type('test@comicrelief.com')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
        cy.get('input[type="radio"]').check('0').should('be.checked')
        cy.get('button[type=submit]').click().url('/success')
        cy.contains('Thanks for letting us know')
        cy.get('div.success-wrapper--inner > div > p').should('contain', 'We won’t claim Gift Aid for your donation')
    })
})

describe('Giftaid test when user comes from sms,online or call centre', () => {

    //sms
    it('e2e test when user comes from sms', () => {
        cy.visit('/update/3D787A59-716B-440D-BD23-50ED301DD9BA')
        cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration')
        cy.get('p.transaction-id').should('contain','Transaction ID: 3D787A59-716B-440D-BD23-50ED301DD9BA')
        cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?')
        cy.get('input[type="radio"]').check('sms').should('be.checked')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-input--emailaddress').clear().type('test@comicrelief.com')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
        cy.get('input[type="radio"]').check('1').should('be.checked')
        cy.get('button[type=submit]').click().url('/success')
        cy.contains(`Thank you, ${firstName}!`)
        cy.get('div.success-wrapper--inner > div > p').should('contain','We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational costs.')
    })

    //online
    it('e2e test when user comes from online', () => {
        cy.visit('/update/F22453C4-964C-4C11-9748-CAA81A37696C')
        cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration')
        cy.get('p.transaction-id').should('contain','Transaction ID: F22453C4-964C-4C11-9748-CAA81A37696C')
        cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?')
        cy.get('input[type="radio"]').check('online').should('be.checked')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-input--emailaddress').clear().type('test@comicrelief.com')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
        cy.get('input[type="radio"]').check('1').should('be.checked')
        cy.get('button[type=submit]').click().url('/success')
        cy.contains(`Thank you, ${firstName}!`)
        cy.get('div.success-wrapper--inner > div > p').should('contain','We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational costs.')
    })

    //call centre
    it('e2e test when user comes from call centre', () => {
        cy.visit('/update/A6E33246-5E5D-44BB-9717-2A828CF2D0E4')
        cy.get('#form > div:nth-child(1) > h2').should('contain','Edit your Gift Aid declaration')
        cy.get('p.transaction-id').should('contain','Transaction ID: A6E33246-5E5D-44BB-9717-2A828CF2D0E4')
        cy.get('h3.form--update__title--donation').should('contain','How did you make the donation?')
        cy.get('input[type="radio"]').check('callcentre').should('be.checked')
        cy.get('#field-input--firstname').clear().type(firstName)
        cy.get('#field-input--lastname').clear().type(lastName)
        cy.get('#field-input--emailaddress').clear().type('test@comicrelief.com')
        cy.get('#field-input--postcode').clear().type('hp2 6lq')
        cy.get('#postcode_button').click()
        cy.get('#field-select--addressSelect').should('be.visible').select('112 ST. AGNELLS LANE')
        cy.get('input[type="radio"]').check('1').should('be.checked')
        cy.get('button[type=submit]').click().url('/success')
        cy.contains(`Thank you, ${firstName}!`)
        cy.get('div.success-wrapper--inner > div > p').should('contain','We’ve registered your Gift Aid declaration, we’ll use it to pay for our operational costs.')
    })

    it('verify social links', () => {
        cy.get('footer li a[title=facebook]')
        cy.get('footer li a[title=twitter]')
        cy.get('footer li a[title=youtube]')
        cy.get('footer li a[title=instagram]')
    })

    it('verify footer menu', () => {
        cy.get('a[href*="/contact-us"]').should('contain', 'Contact us')
        cy.get('a[href*="/working-with-us"]').should('contain', 'Partners')
        cy.get('a[href*="/careers"]').should('contain', 'Careers')
        cy.get('a[href*="/terms-of-use"]').should('contain', 'Legal')
        cy.get('a[href*="/press-releases"]').should('contain', 'Press Area')
        cy.get('a[href*="/reporting-concerns"]').should('contain', 'Reporting concerns')
        cy.get('a[href*="/update-your-preferences"]').should('contain', 'Update your preferences')
        cy.get('a[href*="/privacy-notice"]').should('contain', 'Privacy')
        cy.get('a[href*="/cookies-policy"]').should('contain', 'Cookies')
        cy.get('a[href*="/frequently-asked-questions"]').should('contain', 'FAQs')
        cy.get('a[href*="/accessibility"]').should('contain', 'Accessibility')
        cy.get('a[href*="/sitemap"]').should('contain', 'Sitemap')
        cy.get('a[href*="/comic-reliefs-statement"]').should('contain', 'Modern slavery and human trafficking')
    })

    it('Verify footer copyright', () => {
        cy.get('div.footer__copyright > p').should('contain','Comic Relief 2018. Comic Relief, registered charity 326568 (England/Wales); SC039730 (Scotland)')
    })
})
