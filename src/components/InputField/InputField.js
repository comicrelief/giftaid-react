/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import fieldValidation from './validation';

//
// const defaultValidationPatterns = {
//   tel: '^[0-9 ]+$',
//   number: '^[0-9]+$',
//   email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
//   text: '^[A-Za-z0-9]+$',
// };


class InputField extends Component {
  constructor() {
    super();
    this.inputField = React.createRef();
    this.validateField = this.validateField.bind(this);
    // this.validateField = fieldValidation;
    this.state = {
      valid: null,
      message: '',
    };
  }
  validateField() {
    const props = {
      field: this.inputField.current,
      fieldProps: this.props.field,
    };
    let validation = this.state;
    // helper function will return an updated validation object
    validation = fieldValidation(props, validation);
    this.setState(validation);
  }
  render() {
    return (
      <div id={`field-wrapper--${this.props.field.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.field.type}`}>
        <label id={`field-label--${this.props.field.id}`} htmlFor={`field-input--${this.props.field.id}`} className={`form__field-label${this.props.field.required ? ' required' : ''}`}>
          {this.props.field.label}
        </label>
        {!this.props.field.required &&
        <span>&nbsp;(Optional)&nbsp;</span>
        }
        {this.props.field.helpText !== undefined &&
          <span className="form-help-text">{this.props.field.helpText}</span>
        }
        <input
          ref={this.inputField}
          type={this.props.field.type}
          id={`field-input--${this.props.field.id}`}
          className={`form__field form__field--${this.props.field.type} ${this.state.valid ? '' : 'error'} `}
          required={this.props.field.required && this.props.field.required}
          placeholder={this.props.field.placeholder && this.props.field.placeholder}
          min={this.props.field.min && this.props.field.min}
          max={this.props.field.max && this.props.field.max}
          // onBlur={this.props.field.type !== 'checkbox' ? this.validateField : undefined}
          // onChange={this.props.field.required && this.props.field.type
          // === 'checkbox' ? this.validateField : undefined}
          onBlur={this.validateField}
        />
        {this.props.field.type === 'checkbox' &&
          // span for checkbox styling
          <span />
        }
        {this.state.valid === false &&
        <div
          id={`field-error--${this.props.field.id}`}
          className={`form__field-error-container form__field-error-container--${this.props.field.type}`}
        >
          <span className="form-error">
            {this.state.message}
          </span>
        </div>
        }
      </div>
    );
  }
}


InputField.propTypes = {
  field: propTypes.shape({
    id: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    required: propTypes.bool.isRequired,
    pattern: propTypes.string,
    placeholder: propTypes.string,
    min: propTypes.number,
    max: propTypes.number,
    checked: propTypes.bool,
    helpText: propTypes.string,
    emptyFieldErrorText: propTypes.string,
    invalidErrorText: propTypes.string,
  }).isRequired,
};

export default InputField;
