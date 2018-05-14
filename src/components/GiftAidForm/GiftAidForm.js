/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '../InputField/InputField';


const defaultInputFieldProps = require('./defaultGiftaidFields.json');

let inputFieldsProps;

/**
 * GiftAidForm class
 * Returns elements on this form with default properties.
 * Input field properties can be overridden by passing in a inputFieldOverrides object with the
 * same structure as the defaultInputFieldProps object, e.g.:
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
   * Iterates through the new inputFieldsProps object
   * to create an array of InputField instances for this form
   * @returns {Array}
   */
  getInputFields() {
    const fields = [];
    Object.entries(inputFieldsProps).forEach(([key]) => {
      // identifier key is needed for arrays in React
      fields.push(<InputField key={key} field={inputFieldsProps[key]} />);
    });
    return fields;
  }

  /**
   * Merge default input field properties with overrides.
   * @returns {object}
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
        {this.getInputFields()}
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
