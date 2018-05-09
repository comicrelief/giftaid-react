/* eslint-env browser */
import React, { Component } from 'react';
import propTypes from 'prop-types';


const defaultValidationPatterns = {
  tel: '^[0-9 ]+$',
  number: '^[0-9]+$',
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
  text: '^[A-Za-z0-9]+$',
};

class InputField extends Component {
  constructor() {
    super();
    this.validateField = this.validateField.bind(this);

    this.state = {
      valid: null,
      validationMessage: '',
    };
  }

  getEmptyFieldMessage() {
    let message;
    if (this.props.field.emptyFieldErrorText === undefined) {
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
    } else {
      message = this.props.field.emptyFieldErrorText;
    }
    return message;
  }

  checkInputValue(value) {
    const validation = {
      valid: null,
      message: null,
    };
    let pattern =
      this.props.field.pattern !== undefined ?
        this.props.field.pattern : defaultValidationPatterns[this.props.field.type];
    pattern = new RegExp(pattern);
    const invalidMessage = this.props.field.invalidErrorText;
    // switch between field types
    switch (this.props.field.type) {
      case 'number': {
        console.log(pattern.test(value));
        const min = this.props.field.min;
        const max = this.props.field.max;
        if (((min && !max) && (value < min)) ||
            ((!min && max) && (value > max)) ||
            ((min && max) && (value < min || value > max)) ||
              (pattern.test(value) === false)
        ) {
          validation.valid = false;
          validation.message = invalidMessage !== undefined ? invalidMessage : 'This field can only contain numbers';
        } else {
          validation.valid = true;
        }
        break;
      }
      case 'email': {
        console.log(pattern.test(value));
        if (pattern.test(value) === false) {
          validation.valid = false;
          validation.message = invalidMessage !== undefined ? invalidMessage : 'Please enter a valid email address';
        } else {
          validation.valid = true;
        }
        break;
      }
      case 'tel': {
        console.log(pattern);
        console.log(pattern.test(value));
        if (pattern.test(value) === false) {
          validation.valid = false;
          validation.message = invalidMessage !== undefined ? invalidMessage : 'Please enter a valid phone number';
        } else {
          validation.valid = true;
        }
        break;
      }
      case 'text': {
        console.log(pattern);
        console.log(pattern.test(value));
        if (pattern.test(value) === false) {
          validation.valid = false;
          validation.message = invalidMessage !== undefined ? invalidMessage : 'This field only accepts alphanumeric characters';
        } else {
          validation.valid = true;
        }
        break;
      }
      default:
        break;
    }
    return validation;
  }
  /**
   * Validate the input field.
   * Updates the state with the validity of the field and the correct error message
   */
  validateField() {
    const field = document.getElementById('field-input--' + this.props.field.id);
    const value = field.value;
    let validation = {
      valid: null,
      message: null,
    };
    // if field is checkbox set value to check against
    if (field.getAttribute('type') === 'checkbox') {
      field.value = field.checked;
    }
    // if field is empty
    if (!value || value === 'false') {
      validation.valid = false;
      validation.message = this.getEmptyFieldMessage();
    } else if (value && value !== 'false') {
      validation = this.checkInputValue(value);
    } else {
      validation.valid = true;
      validation.message = '';
    }
    this.setState({
      valid: validation.valid,
      validationMessage: validation.message,
    });
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
          placeholder={this.props.field.placeholder && this.props.field.placeholder}
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
            {this.state.validationMessage}
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
