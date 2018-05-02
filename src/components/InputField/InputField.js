/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';

class InputField extends Component {
  render() {
    return (
      <div className="form__fieldset">
        <label id={`field-label--${this.props.field.id}`} htmlFor={`field-input--${this.props.field.id}`} className={`form__field-label ${this.props.field.required ? 'required' : ''}`}>
          {this.props.field.label}
        </label>
        <input id={`field-input--${this.props.field.id}`} className="form__field" />
        <div className="form__field-error-container">
          <span className="form-error" />
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  field: propTypes.shape.isRequired,
};

export default InputField;
