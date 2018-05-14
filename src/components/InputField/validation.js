const defaultValidationPatterns = {
  tel: '^[0-9 ]+$',
  number: '^[0-9]+$',
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
  text: '^[A-Za-z0-9]+$',
};

function isEmpty(value, required, type) {
  let empty;
  if (required === true && (!value || value === false)) {
    empty = true;
  } else if (value && type !== 'checkbox') {
    empty = false;
  }
  return empty;
}

function isValidInput(type, fieldProps, value) {
  let valid;
  // use pattern override if available otherwise use default pattern
  const patternOverride = fieldProps.pattern;
  const pattern = patternOverride !== undefined ?
    new RegExp(patternOverride) : new RegExp(defaultValidationPatterns[type]);
  // if field type is number check for min and max values
  if (type === 'number') {
    const min = fieldProps.min;
    const max = fieldProps.max;
    const valueIsNumber = pattern.test(value);
    if (valueIsNumber === true) {
      if ((!min && max && value <= max) ||
      (min && !max && value >= min) ||
      (min && max && (value >= min && value <= max))) {
        valid = true;
      } else {
        valid = false;
      }
    }
  } else {
    valid = pattern.test(value);
  }
  return valid;
}

function getMessage(input, fieldProps, value) {
  let message = input === 'empty' ? fieldProps.emptyFieldErrorText : fieldProps.invalidErrorText;
  // use message override if available otherwise use default empty/invalid message
  if (message === undefined) {
    switch (fieldProps.type) {
      case 'number': {
        const min = fieldProps.min;
        const max = fieldProps.max;
        if ((!min && max) && (input === 'empty' || value > max)) {
          message = input === 'empty' ? 'Please fill in a value below ' + max : 'This fields only accepts a number below ' + max;
        } else if ((min && !max) && (input === 'empty' || value < min)) {
          message = input === 'empty' ? 'Please fill in a value above' + min : 'This fields only accepts a number above ' + min;
        } else if ((min && max) && (input === 'empty' || (value < min || value > max))) {
          message = input === 'empty' ? 'Please fill in a value between ' + min + ' and ' + max : '\'This fields only accepts a number between ' + min + ' and ' + max;
        } else {
          message = 'Please enter a number';
        }
        break;
      }
      case 'tel':
      case 'email':
        message = input === 'empty' ? `Please fill in your ${fieldProps.name}` : `Please fill in a valid ${fieldProps.name}`;
        break;
      case 'checkbox':
        message = `Please check the ${fieldProps.name} checkbox`;
        break;
      case 'text':
      default:
        message = input === 'empty' ? `Please fill in your ${fieldProps.name}` : 'This field only accepts alphanumeric characters';
        break;
    }
  }
  return message;
}

/**
 * Validate input fields
 * returns validation object containing whether the field is valid and an error message
 */
export default function fieldValidation(props, validation) {
  const type = props.field.getAttribute('type');
  const value = type === 'checkbox' ? props.field.checked : props.field.value;
  const emptyField = isEmpty(value, props.fieldProps.required, type);
  if (emptyField === true) {
    validation.valid = false;
    validation.message = getMessage('empty', props.fieldProps);
  } else if (emptyField === false) {
    const validInput = isValidInput(type, props.fieldProps, value);
    validation.valid = validInput !== false;
    validation.message = validInput === false ? getMessage('invalid', props.fieldProps, value) : '';
  } else {
    validation.valid = true;
    validation.message = '';
  }
  return validation;
}

