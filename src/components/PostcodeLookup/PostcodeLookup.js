/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import SelectField from '../SelectField/SelectField';
import InputField from '../InputField/InputField';
import countries from './countries.json';


class PostcodeLookup extends Component {
  /**
   * AddressLookup constructor
   */
  constructor() {
    super();
    this.state = {
      addressDropdownList: [],
      countryDropdownList: [],
      addressLookupData: false,
      postcodeValidationMessage: false,
      previousAddress: '',
      validation: {
        postcode: {
          valid: null,
          message: '',
          value: '',
        },
        address1: {
          valid: null,
          message: '',
          value: '',
        },
        address2: {
          valid: null,
          message: '',
          value: '',
        },
        address3: {
          valid: null,
          message: '',
          value: '',
        },
        town: {
          valid: null,
          message: '',
          value: '',
        },
        country: {
          valid: null,
          message: '',
          value: '',
        },
      },
    };
    this.setAddressSelectRef = (element) => {
      this.addressSelectRef = element;
    };
    this.setAddressDetailRef = (element) => {
      this.addressDetailRef = element;
    };
    this.setCountrySelectRef = (element) => {
      this.countrySelectRef = element;
    };

    this.addressLookup = this.addressLookup.bind(this);
    this.showAddressFields = this.showAddressFields.bind(this);
  }

  componentWillMount() {
    this.createCountryDropdownList();
  }

  /**
   * Send validation to Parent
   */
  componentDidUpdate() {
    if (typeof this.props.isAddressValid === 'function') {
      this.props.isAddressValid(this.state.validation);
    }
  }

  /**
   * Update state with value and validity from child
   * @param name
   * @param valid
   */
  setValidity(name, valid) {
    if ((this.state.validation[name].value === undefined || this.state.validation[name].value !== valid.value) ||
      (this.state.validation[name].message !== valid.message)) {
      this.setState({
        validation: {
          ...this.state.validation,
          [name]: {
            valid: valid.valid,
            value: valid.value,
            message: valid.message,
          },
        },
      });
    }
  }

  /**
   * Fetch addresses from lookup API and update state
   * @return {Promise}
   */
  addressLookup() {
    return fetch(`https://lookups.sls.comicrelief.com/postcode/lookup?query=${this.state.validation.postcode.value}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then((response) => {
        if (response.addresses !== null && response.addresses.length >= 1) {
          this.setState({
            postcodeValidationMessage: false,
            addressLookupData: response.addresses,
          });
          this.createAddressDropdownList();
        } else {
          this.setState({
            postcodeValidationMessage: response.message,
          });
        }
      });
  }

  /**
   * Creates object for address select field options.
   * Updates state with new address object and shows address select field
   */
  createAddressDropdownList() {
    const addresses = [{ label: 'Please select', value: null }];
    this.state.addressLookupData.map(item =>
      addresses.push({ label: item.Line1, value: item }));
    this.setState({
      addressDropdownList: addresses,
    });
    // show address select field
    const addressSelect = this.addressSelectRef.selectRef;
    addressSelect.parentElement.classList.remove('visually-hidden');
  }

  /**
   * Creates object for country select field options from json file.
   * Updates state with new country object.
   */
  createCountryDropdownList() {
    const dropDownList = [
      { label: 'United Kingdom', value: 'GB', selected: true },
      { label: '-------------------', disabled: true },
    ];
    Object.keys(countries).map(key =>
      dropDownList.push({ label: countries[key], value: key }));
    this.setState({
      countryDropdownList: dropDownList,
      validation: {
        ...this.state.validation,
        country: {
          valid: true,
          message: '',
          value: 'GB',
        },
      },
    });
  }

  /**
   * Updates state with selected address values
   * Shows address detail fields
   * Changes country select field back to GB
   * @param value
   */
  updateAddress(value) {
    if (value.length >= 1) {
      const address = JSON.parse(value);
      if (address && (this.state.previousAddress === undefined || this.state.previousAddress !== address.Line1)) {
        this.setState({
          previousAddress: address.Line1,
          validation: {
            ...this.state.validation,
            postcode: {
              valid: true,
              value: address.postcode,
              message: '',
            },
            address1: {
              valid: true,
              value: address.Line1,
              message: '',
            },
            address2: {
              valid: true,
              value: !address.Line2 ? '' : address.Line2,
              message: '',
            },
            address3: {
              valid: true,
              value: !address.Line3 ? '' : address.Line3,
              message: '',
            },
            town: {
              valid: true,
              value: address.posttown,
              message: '',
            },
            country: {
              valid: true,
              value: 'GB',
              message: '',
            },
          },
        });
        this.showAddressFields();
        // change the country back to GB
        this.countrySelectRef.selectRef.selectedIndex = 0;
      }
    }
  }

  showAddressFields() {
    this.addressDetailRef.classList.remove('visually-hidden');
  }

  /**
   * Gets validation info from state and returns it to child
   * Everything works fine for the Town field, but not for Address1 :/
   * @param id
   * @return {*}
   */
  addressValue(id) {
    let value = this.state.validation;
    if (value[id] !== undefined) {
      value = value[id];
    }
    return value;
  }
  returnPostcodeValidation() {
    return this.state.postcodeValidationMessage !== false ? {
      message: this.state.postcodeValidationMessage,
      valid: false,
      showErrorMessage: true,
    } : '';
  }

  /**
   * AddressLookup render
   * @return {*}
   */
  render() {
    return (
      <div className="form__row form__row--billing-detail form__row--address-lookup">
        <InputField
          id="postcode"
          type="text"
          name="postcode"
          label="Enter your postcode"
          required
          placeholder="SE1 7TP"
          pattern="[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}"
          inlineButton
          buttonValue="FIND ADDRESS"
          emptyFieldErrorText="Please enter your postcode"
          invalidErrorText="Please enter a valid postcode"
          value={id => this.addressValue(id)}
          isValid={(valid, name) => { this.setValidity(name, valid); }}
          buttonClick={() => this.addressLookup().then(() => this.returnPostcodeValidation())}
          showErrorMessage={false}
        />
        <SelectField
          ref={this.setAddressSelectRef}
          id="addressSelect"
          name="addressSelect"
          label="Select your address"
          required={false}
          options={this.state.addressDropdownList}
          extraClass="visually-hidden"
          showErrorMessage={false}
          isValid={(valid, name, value) => { this.updateAddress(value); }}
        />
        <button className="link" onClick={this.showAddressFields}>Or enter your address manually</button>
        <div
          ref={this.setAddressDetailRef}
          id="address-detail"
          className="form__fieldset form__field--address-detail visually-hidden"
        >
          <InputField
            id="address1"
            type="text"
            name="address1"
            label="Address line 1"
            required
            value={id => this.addressValue(id)}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="address2"
            type="text"
            name="address2"
            label="Address line 2"
            value={id => this.addressValue(id)}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="address3"
            type="text"
            name="address3"
            label="Address line 3"
            required={false}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <InputField
            id="town"
            type="text"
            name="town"
            label="Town/City"
            required
            value={id => this.addressValue(id)}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
          <SelectField
            ref={this.setCountrySelectRef}
            id="country"
            name="country"
            label="Country"
            required
            options={this.state.countryDropdownList}
            value={() => this.state.validation.country.value}
            isValid={(valid, name) => { this.setValidity(name, valid); }}
          />
        </div>
      </div>
    );
  }
}


PostcodeLookup.defaultProps = {
  isAddressValid: null,
};
PostcodeLookup.propTypes = {
  isAddressValid: propTypes.func,
};

export default PostcodeLookup;
