//
// **** App Tests ****

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Grants form tests', () => {

  beforeEach(() =>  {
    cy.visit('/')
  })
  const mobile = '07897997799';

  context('Titles', () => {
    it('should have a page and form title', () => {
      cy.title().should('include', 'Gift Aid declaration')
      cy.get('.giftaid__form').should('contain', 'Giftaid it')
    })
  })

  context('Form behaviour', () => {
    it('should show the giftaid checkbox as checked by default and show error message if deselected', () => {
      cy.get('#field-input--giftaid').should('be.checked');
      cy.get('#field-input--giftaid').uncheck();
      cy.get('#field-label--giftaid').should('have.class', 'error');
      cy.get('#field-error--giftaid').should('be.visible');
      cy.get('#field-error--giftaid').should('contain', 'To Gift Aid your donation you need to tick the checkbox');
    })

    it('should show an error if invalid first name is entered and no error when valid input is given', () => {
      cy.get('#field-input--firstname').type('}');
      cy.get('#field-error--firstname').should('contain', 'This field only accepts alphanumeric characters and \' . - & _');
      cy.get('#field-input--firstname').clear().type('Joe');
      cy.get('#field-error--firstname').should('not.be.visible');
    })

    it('should show error on postcode field on find address click when no postcode is provided', () => {
      cy.get('#postcode_button').click();
      cy.get('#field-error--postcode').should('be.visible');
      cy.get('#field-error--postcode').should('contain', 'No postcode provided');
    })

    it('should show error on postcode field when api cannot find address with valid postcode', () => {
      cy.get('#field-input--postcode').type('SE17TPp');
      cy.get('#postcode_button').click();
      cy.get('#field-error--postcode').should('be.visible');
      cy.get('#field-error--postcode').should('contain', 'Sorry, we could not find any addresses in that postcode, please check the postcode, or use the manual entry')
      cy.get('#field-wrapper--addressSelect').should('not.be.visible');
    })

    it('should show addres select field when valid postcode is provided and result form api', () => {
      cy.get('#field-input--postcode').type('SE17TP');
      cy.get('#postcode_button').click();
      cy.get('#field-error--postcode').should('not.be.visible');
      cy.get('#field-wrapper--addressSelect').should('be.visible');
    })
    
  })

  context('submitting invalid form', () => {
    it('should fail submission and show error on mobile field if no field is filled in', () => {
      cy.get('button[type="submit"]').click();
      cy.get('#field-label--mobile').should('have.class', 'error');
      // field should be in view
      cy.get('#field-input--mobile').should('be.visible');
      cy.get('#field-error--mobile').should('be.visible');
      cy.get('#field-error--mobile').should('contain', 'Please fill in your mobile number');
    })

    it('should fail submission and show error on firstname field if only mobile number is filled in', () => {
      cy.get('#field-input--mobile').type(mobile).should('have.value', mobile);
      cy.get('button[type="submit"]').click();
      cy.get('#field-label--firstname').should('have.class', 'error');
      // field should be in view
      cy.get('#field-input--firstname').should('be.visible');
      cy.get('#field-error--firstname').should('be.visible');
      cy.get('#field-error--firstname').should('contain', 'Please fill in your first name');
    })

    it('should show address details fields with error messages when submission fails', () => {
      cy.get('button[type="submit"]').click();
      cy.get('#address-detail').not('.visually-hidden');
      cy.get('#field-label--address1').should('have.class', 'error');
      cy.get('#field-error--address1').should('contain', 'Please fill in your address line 1');
    })
    it('should only show error messages on required fields when submission fails', () => {
      cy.get('button[type="submit"]').click();
      cy.get('label').not('.required').not('.error');
    })
  })



});
