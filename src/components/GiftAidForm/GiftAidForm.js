/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import InputField from '@comicrelief/storybook/src/components/InputField/InputField';


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

  getInputFields(inputFields) {
    Object.entries(inputFieldsProps).map(([field, props]) => inputFields.push(<InputField
      key={field}
      id={props.id}
      type={props.type}
      name={props.name}
      label={props.label}
      required={props.required}
      pattern={props.pattern}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      defaultChecked={props.defaultChecked}
      extraClass={props.extraClass}
      helpText={props.helpText}
      emptyFieldErrorText={props.emptyFieldErrorText}
      invalidErrorText={props.invalidErrorText}
    />));
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
    const inputFields = [];
    this.getInputFields(inputFields);
    return (
      <form id="form">
        { inputFields }
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
