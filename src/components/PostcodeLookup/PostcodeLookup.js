/* eslint-disable max-len */
/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';
import SelectField from '../SelectField/SelectField';


class PostcodeLookup extends Component {
  /**
   * AddressLookup constructor
   */
  constructor() {
    super();
    this.state = {
      addressDropdownList: [],
      addressLookupData: false,
      form: {
        postcode: '',
      },
      postcodeValidationMessage: false,

    };
    this.addressLookup = this.addressLookup.bind(this);
  }

  /**
   * Lookup address
   * @return {Promise<void>}
   */
  async addressLookup() {
    const response = await fetch(`https://lookups.sls.comicrelief.com/postcode/lookup?query=${this.state.form.postcode}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();

    if (responseData.addresses !== null && responseData.addresses.length >= 1) {
      this.setState({
        postcodeValidationMessage: false,
        addressLookupData: responseData.addresses,
      });
      this.createAddressDropdownList();
    } else {
      this.setState({
        postcodeValidationMessage: responseData.message,
      });
    }
    console.log(responseData);
    console.log(this.state.postcodeValidationMessage);
    console.log(this.state.addressLookupData);
  }

  createAddressDropdownList() {
    const addresses = [{ label: 'Please select', value: null }];
    this.state.addressLookupData.map(item =>
      addresses.push({ label: item.Line1, value: item.Line1 }));
    console.log(addresses);
    this.setState({ addressDropdownList: addresses });
  }

  // createAddressFields() {
  //   const addressFields = [];
  //   this.state.addressLookupData.map(item =>(
  //     <InputField id={} type={} name={} label={} required={}/>
  //   ));
  // }

  updatePostcode(value) {
    this.setState({
      form: {
        postcode: value,
      },
    });
  }

  // /**
  //  * Test whether the form is valid
  //  * @return {boolean}
  //  */
  // validateForm() {
  //   const validation = this.state.validation;
  //   let status = true;
  //
  //   // Test the postcode variable
  //   if (!Validate.isString(this.state.form.postcode) || this.state.postcodeValidationMessage !== false ||
  //     /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i.test(this.state.form.postcode.replace(/\s/g, '')) === false) {
  //     validation.postcode = false;
  //     status = false;
  //   } else {
  //     validation.postcode = true;
  //   }
  //
  //   // Test the first line of the address validity
  //   if (!Validate.isString(this.state.form.address1) || this.state.form.address1.length < 2) {
  //     validation.address1 = false;
  //     status = false;
  //   } else {
  //     validation.address1 = true;
  //   }
  //
  //   // Test the town validity
  //   if (!Validate.isString(this.state.form.town) || this.state.form.town.length < 2) {
  //     validation.town = false;
  //     status = false;
  //   } else {
  //     validation.town = true;
  //   }
  //
  //   this.setState({ validation }, this.updateParentState);
  //
  //   return status;
  // }

  // /**
  //  * Update address fields with address
  //  * @param event
  //  */
  // selectAddress(event) {
  //   const address = this.state.addressLookupData[event.target.value];
  //
  //   this.setState({
  //     addressLookupData: false,
  //     form: {
  //       ...this.state.form,
  //       address1: address.Line1,
  //       town: address.posttown,
  //       country: 'GB',
  //     },
  //     showAddressFields: true,
  //   }, this.validateForm);
  // }

  // /**
  //  * Update the parent state with required variables
  //  */
  // updateParentState() {
  //   // Update the parent state with form values
  //   this.props.parentStateUpdate(this.state.form);
  //
  //   // Update the validation status of the component to the parent
  //   this.props.validationUpdate(this.state.validation.address1 === true &&
  //     this.state.validation.postcode === true &&
  //     this.state.validation.town);
  // }

  /**
   * AddressLookup render
   * @return {*}
   */
  render() {
    console.log(this.props.burre);
    console.log('addressList state', this.state.addressList);
    return (
      <div>
        <InputField
          id="postcode"
          type="text"
          name="postcode"
          label="Enter your postcode"
          required
          placeholder="SE1 7TP"
          pattern="[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}"
          emptyFieldErrorText="Please enter your postcode"
          invalidErrorText="Please enter a valid postcode"
          isValid={(valid, name, value) => { this.updatePostcode(value); }}

        />
        <input
          onClick={this.addressLookup}
          type="button"
          id="postcode_button"
          name="btnPostcodeSearch"
          className="btnPostcodeSearch postcode"
          value="FIND ADDRESS"
        />
        <SelectField id="bliep" name="blaap" label="Select your address" required options={this.state.addressDropdownList} showErrorMessage={false} />
      </div>


    );
  }
}

PostcodeLookup.propTypes = {
  burre: propTypes.string.isRequired,
};

export default PostcodeLookup;
