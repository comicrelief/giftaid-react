describe('Giftaid form tests', () => {

  beforeEach(() =>  {
    cy.visit('/')
  })
  
  const mobile = '07897997799';
  const firstname = 'Joe';
  const lastname = 'Smith';
  const postcode = 'se17tp';
  const addressLine1 = '89 ALBERT EMBANKMENT';
  const town = 'London';


  context('Titles', () => {
    it('should have a page and form title', () => {
      cy.title().should('include', 'Gift Aid declaration')
      cy.get('.giftaid__form').should('contain', 'Giftaid it')
    })
  })

  context('Form behaviour', () => {
    it('should show the giftaid checkbox as unchecked by default and show error message if checked then unchecked', () => {
      cy.get('#field-input--giftaid').should('be.unchecked');
      cy.get('#field-input--giftaid').check();
      cy.get('#field-input--giftaid').uncheck();
      cy.get('#field-label--giftaid').should('have.class', 'error');
      cy.get('#field-error--giftaid').should('be.visible');
      cy.get('#field-error--giftaid').should('contain', 'To Gift Aid your donation you need to tick the checkbox');
    })

    it('should show an error if invalid first name is entered and no error when valid input is given', () => {
      cy.get('#field-input--firstname').type('}');
      cy.get('#field-error--firstname').should('contain', 'This field only accepts alphanumeric characters and \' . - & _');
      cy.get('#field-input--firstname').clear().type(firstname);
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
      cy.get('#field-select--addressSelect').should('not.be.visible');
    })

    it('should show address select field when valid postcode is provided and result form api', () => {
      cy.get('#field-input--postcode').type(postcode);
      cy.get('#postcode_button').click();
      cy.get('#field-error--postcode').should('not.be.visible');
      cy.get('#field-wrapper--addressSelect').should('be.visible');
    })

    it('should show and populate/update the address fields when selecting an address', () => {
      // hardcoded values to prevent failure if variables are changed
      cy.get('#field-input--postcode').type('se17tp');
      cy.get('#postcode_button').click();
      cy.get('#field-select--addressSelect').select('CAMELFORD HOUSE');
      cy.get('#field-input--address1').should('be.visible');
      cy.get('#field-input--address1').should('have.value', 'CAMELFORD HOUSE');
      cy.get('#field-input--address2').should('have.value', '87-90 ALBERT EMBANKMENT');
      cy.get('#field-input--address3').should('be.empty');
      cy.get('#field-input--town').should('have.value', 'LONDON');
      cy.get('#field-select--addressSelect').select('CAMELFORD HOUSE');
      cy.get('#field-select--country').select('Albania');
      cy.get('#field-select--addressSelect').select('85 ALBERT EMBANKMENT');
      cy.get('#field-input--address1').should('have.value', '85 ALBERT EMBANKMENT');
      cy.get('#field-input--address2').should('be.empty');
      cy.get('#field-input--address3').should('be.empty');
      cy.get('#field-input--town').should('have.value', 'LONDON');
      cy.get('#field-select--country').should('have.value', 'GB');
    })

    it('should show the address fields when clicking on add address manually', () => {
      cy.get('#address-detail').should('have.class', 'visually-hidden');
      cy.get('a[role="button"]').click();
      cy.get('#address-detail').not('.visually-hidden');
      cy.get('#field-input--address1').should('be.visible');
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

  context('submitting valid form with manual address', () => {
    it('should pass submission', () => {
      cy.get('#field-input--mobile').type(mobile).should('have.value', mobile);
      cy.get('#field-input--firstname').type(firstname).should('have.value', firstname);
      cy.get('#field-input--lastname').type(lastname).should('have.value', lastname);
      cy.get('#field-input--postcode').type(postcode).should('have.value', postcode);
      cy.get('a[role="button"]').click();
      cy.get('#field-input--address1').type(addressLine1).should('have.value', addressLine1);
      cy.get('#field-input--town').type(town).should('have.value', town);
      cy.get('button[type="submit"]').click();
      cy.get('.success-wrapper--inner > h1').should('contain', 'Thank you, ' + firstname);
    })
  })

  context('submitting valid form with selected address', () => {
    it('should pass submission', () => {
      cy.get('#field-input--mobile').type(mobile).should('have.value', mobile);
      cy.get('#field-input--firstname').type(firstname).should('have.value', firstname);
      cy.get('#field-input--lastname').type(lastname).should('have.value', lastname);
      cy.get('#field-input--postcode').type('se17tp').should('have.value', 'se17tp');
      cy.get('#postcode_button').click();
      cy.get('#field-select--addressSelect').select('85 ALBERT EMBANKMENT');
      cy.get('button[type="submit"]').click();
      cy.get('.success-wrapper--inner > h1').should('contain', 'Thank you, ' + firstname);
    })
  })

});
