/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';

const defaultInputFieldProps = {
  giftaidCheck: {
    id: 'giftaid',
    type: 'checkbox',
    name: 'Gift Aid',
    label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation',
    required: true,
    checked: false,
  },
  phoneNumber: {
    id: 'mobile',
    type: 'tel',
    name: 'mobile number',
    label: 'Enter your mobile number',
    required: true,
    pattern: '^07[0-9]{9}$',
    helpText: '(The one you used for your text donation in the format of: 07...)',
    invalidErrorText: 'Please enter a valid mobile phone number - it must be the same number that you used to make your donation.',
  },
  firstName: {
    id: 'firstname',
    type: 'text',
    name: 'first name',
    label: 'First name',
    required: true,
    emptyFieldErrorText: 'zoooo stom',
  },
  lastName: {
    id: 'lastname',
    type: 'text',
    name: 'last name',
    label: 'Last name',
    required: false,
  },
  email: {
    id: 'email',
    type: 'email',
    name: 'email address',
    label: 'Email address',
    required: true,
    placeholder: 'name@example.ex',
  },
  amount: {
    id: 'amount',
    type: 'number',
    name: 'donation amount',
    label: 'Amount',
    min: 1,
    max: 5000,
    required: true,
  },
};
let inputFieldsProps;
/**
 * GiftAidForm class
 * Returns elements on this form with default properties.
 * Input field properties can be overridden by passing in a inputFieldOverrides object with the
 * same structure as the defaultInputFieldProps object above, e.g.:
 * inputFieldOverrides = {
 *   firstName: {
 *     label: 'some text',
 *   },
 * }
 */
class GiftAidForm extends Component {
  componentWillMount() {
    return inputFieldsProps = this.mergeInputFieldProps();
  }
  /**
   * Merge default input field properties with overrides.
   * @return {object}
   */
  mergeInputFieldProps() {
    // default props
    const inputFields = defaultInputFieldProps;

    // iterate through the overrides object passed in and
    // set the new value for items that need to be overridden
    if (Object.keys(this.props.inputFieldOverrides).length !== 0) {
      Object.entries(this.props.inputFieldOverrides).forEach(([field, fieldDetails]) => {
        Object.entries(fieldDetails).forEach(([key, value]) => {
          inputFields[field][key] = value;
        });
      });
    }
    return inputFields;
  }
  render() {
    return (
      <form id="form">
        {/* to do iterate through see if you need polyfill for map */}
        <InputField
          field={inputFieldsProps.giftaidCheck}
        />
        <InputField
          field={inputFieldsProps.phoneNumber}
        />
        <InputField
          field={inputFieldsProps.firstName}
        />
        <InputField
          field={inputFieldsProps.lastName}
        />
        <InputField
          field={inputFieldsProps.email}
        />
        <InputField
          field={inputFieldsProps.amount}
        />
        {/* Postcode lookup component */}
        {/* Submit button component  */}
      </form>
    );
  }
}

GiftAidForm.defaultProps = {
  inputFieldOverrides: {},
};

GiftAidForm.propTypes = {
  inputFieldOverrides: propTypes.shape(propTypes.shape),
};

export default GiftAidForm;
