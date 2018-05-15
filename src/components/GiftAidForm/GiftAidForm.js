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
   * Merge default input field properties with overrides.
   * @returns {object}
   */
  mergeInputFieldProps() {
    const inputFields = defaultInputFieldProps;
    const overrides = this.props.inputFieldOverrides;
    Object.entries(overrides).forEach(([key]) => {
      Object.assign(inputFields[key], overrides[key]);
    });
    return inputFields;
  }
  render() {
    return (
      <form id="form">
        { // iterate through the new fields object and render the InputFields
          Object.keys(inputFieldsProps).map(key =>
            <InputField key={key} field={inputFieldsProps[key]} />) }
        {/* To do Postcode lookup component */}
        {/* To do Submit button component  */}
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
