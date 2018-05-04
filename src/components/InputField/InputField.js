/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';

class InputField extends Component {
  render() {
    return (
      <div id={`field-wrapper--${this.props.field.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.field.type}`}>
        <label id={`field-label--${this.props.field.id}`} htmlFor={`field-input--${this.props.field.id}`} className={`form__field-label ${this.props.field.required ? 'required' : ''}`}>
          {this.props.field.label}
        </label>
        {this.props.field.helpText !== undefined &&
        <span className="form-help-text">{this.props.field.helpText}</span>
        }
        <input type={this.props.field.type} id={`field-input--${this.props.field.id}`} className={`form__field form__field--${this.props.field.type}`} />
        <div id={`field-error--${this.props.field.id}`} className={`form__field-error-container form__field-error-container--${this.props.field.type}`}>
          <span className="form-error" />
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  field: propTypes.shape({
    id: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    required: propTypes.bool.isRequired,
    helpText: propTypes.string,
  }).isRequired,
};

export default InputField;
