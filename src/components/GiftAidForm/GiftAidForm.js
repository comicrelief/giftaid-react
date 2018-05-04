/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';

const defaultInputFieldProps = {
  giftaidCheck: {
    id: 'giftaid',
    type: 'checkbox',
    label: 'Yes, I would like Comic Relief to claim Gift Aid on my donation',
    required: true,
  },
  phoneNumber: {
    id: 'phone',
    type: 'tel',
    label: 'Enter your mobile number',
    required: true,
    helpText: '(The one you used for your text donation in the format of: 07...)',
  },
  firstName: {
    id: 'firstname',
    type: 'text',
    label: 'First name',
    required: true,
    helpText: '',
  },
  lastName: {
    id: 'lastname',
    type: 'text',
    label: 'Last name',
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
