const selectors = {
  giftaid: {
    option: '#field-label--giftaid',
  },
  
  homepage: {
    heading: 'h1.giftaid-title',
  },
  
  giftAidClaimChoice: {
    yes: '#giftAidClaimChoice>div:nth-child(2)>label',
    no: '#giftAidClaimChoice>div:nth-child(3)>label',
    yesInput: '#giftAidClaimChoice>div:nth-child(2)>input',
    noInput: '#giftAidClaimChoice>div:nth-child(3)>input',
  },
  
  formFields: {
    mobile: '#field-input--mobile',
    firstName: 'input#field-input--firstname',
    lastName: 'input#field-input--lastname',
    postcode: 'input#field-input--postcode',
    postcodeLookup: '#postcode_button',
    submitButton: 'button[type=submit]',
  },
  
  address: {
    manualAddressLink: 'a[aria-describedby=field-error--addressDetails]',
    addressSelect: '#field-select--addressSelect',
    address1: '#field-input--address1',
    address2: '#field-input--address2',
    address3: '#field-input--address3',
    town: '#field-input--town',
    country: 'select#field-select--country',
    countryByName: 'select[name="country"]',
    countryDropdown: 'select#field-select--country',
    countryOptions: 'select#field-select--country > option',
  },
  
  marketingPreferences: {
    options: {
      email: '[aria-label="field-label--Email--Email"]',
      phone: '[aria-label="field-label--Phone--Phone"]',
      text: '[aria-label="field-label--Text--SMS"]',
    },
    fields: {
      email: 'input#field-input--email',
      phone: 'input#field-input--phone',
    },
  },
  
  errorMessages: {
    mobile: 'div#field-error--mobile > span',
    firstName: 'div#field-error--firstname > span',
    lastName: 'div#field-error--lastname > span',
    email: '#field-error--email > span',
    phone: 'div#field-error--phone > span',
    postcode: 'div#field-error--postcode > span',
    addressSelect: 'div#field-error--addressSelect > span',
    address1: '#field-error--address1 > span',
    town: '#field-error--town > span',
    addressDetails: 'div#field-error--addressDetails > span',
    giftAidClaimChoice: 'div#field-error--giftAidClaimChoice > span',
  },
  
  success: {
    heading: 'div.success-wrapper--inner h1',
  },
  sorry: {
    heading: 'div > h1',
    firstParagraph: 'div > div > p:nth-child(1)',
  },
};

module.exports = { selectors };
