/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';

// const requiredFieldMsg = `Please fill in your ${this.props.name}`;
// const invalidFieldMsg = '';

class InputField extends Component {
  constructor() {
    super();
    this.validateField = this.validateField.bind(this);

    this.state = {
      valid: null,
      validationMessage: '',
    };
  }
  getMessage() {
    let message;
    switch (this.props.field.type) {
      case 'number':
        if (this.props.field.min && !this.props.field.max) {
          message = 'Please enter a value above or equal to ' + this.props.field.min;
        }
        if (!this.props.field.min && this.props.field.max) {
          message = 'Please enter a value below or equal to ' + this.props.field.max;
        }
        if (this.props.field.min && this.props.field.max) {
          message = 'Please enter a value between ' + this.props.field.min + ' and ' + this.props.field.max;
        }
        break;
      case 'checkbox':
        message = 'Please check the ' + this.props.field.name + ' checkbox';
        break;
      default:
        message = 'Please fill in your ' + this.props.field.name;
        break;
    }
    return message;
  }
  checkInputValue(value) {
    let valid;
    switch (this.props.field.type) {
      case 'number': {
        const min = this.props.field.min;
        const max = this.props.field.max;
        if (((min && !max) && (value < min)) ||
            ((!min && max) && (value > max)) ||
            ((min && max) && (value < min || value > max))
        ) {
          valid = false;
        }
        break;
      }
      case 'email': {
        break;
      }
      case 'tel': {
        break;
      }
      default: {
        console.log('bla');
        break;
      }
    }
    return valid;
  }

  validateField() {
    const field = document.getElementById('field-input--' + this.props.field.id);
    const message = this.getMessage();
    console.log('message', message);
    if (field.getAttribute('type') === 'checkbox') {
      field.value = field.checked;
      console.log(field.value);
    }
    if (!field.value || field.value === 'false') {
      console.log('no value');
      this.setState(() => ({
        valid: false,
        validationMessage: message,
      }));
    } else if (field.value && field.value !== 'false') {
      console.log('value here');
      const valid = this.checkInputValue(field.value);
      this.setState(() => ({
        valid,
        validationMessage: message,
      }));
    } else {
      this.setState({
        valid: true,
        validationMessage: '',
      });
    }
  }

  render() {
    return (
      <div id={`field-wrapper--${this.props.field.id}`} className={`form__fieldset form__field-wrapper form__field-wrapper--${this.props.field.type}`}>
        <label id={`field-label--${this.props.field.id}`} htmlFor={`field-input--${this.props.field.id}`} className={`form__field-label${this.props.field.required ? ' required' : ''}`}>
          {this.props.field.label}
        </label>
        {this.props.field.helpText !== undefined &&
          <span className="form-help-text">{this.props.field.helpText}</span>
        }
        <input
          type={this.props.field.type}
          id={`field-input--${this.props.field.id}`}
          className={`form__field form__field--${this.props.field.type}`}
          required={this.props.field.required && this.props.field.required}
          min={this.props.field.min && this.props.field.min}
          max={this.props.field.max && this.props.field.max}
          onBlur={this.props.field.required ? this.validateField : undefined}
        />
        {this.props.field.type === 'checkbox' &&
          // span for checkbox styling
          <span />
        }
        {this.state.valid === false &&
        <div id={`field-error--${this.props.field.id}`} className={`form__field-error-container form__field-error-container--${this.props.field.type}`}>
          <span className="form-error">
            { /* eslint-disable max-len */ }
            {this.props.field.emptyFieldErrorText ? this.props.field.emptyFieldErrorText : this.state.validationMessage}
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
    min: propTypes.number,
    max: propTypes.number,
    checked: propTypes.bool,
    helpText: propTypes.string,
    emptyFieldErrorText: propTypes.string,
  }).isRequired,
};

export default InputField;
