// const defaultValidationPatterns = {
//   tel: '^[0-9 ]+$',
//   number: '^[0-9]+$',
//   email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
//   text: '^[A-Za-z0-9]+$',
// };


function numberValidation(pattern, empty, value) {
  const validation = {};
  if (empty === true) {
    validation.valid = false;
    validation.message = 'Please fill in a number';
  }
  if (empty === false) {
    pattern = new RegExp(pattern);
    console.log('passes', pattern.test(value));

  }
  return validation;
}


// const defaultValidation = {
//   number: {
//     pattern: '^[0-9]+$',
//     validation(empty, value) { return numberValidation(this.pattern, empty, value); },
//   },
//
// };

function isEmpty(value, required, type) {
  let empty;
  if (required === true && (!value || value === false)) {
    empty = true;
  } else if (value && type !== 'checkbox') {
    empty = false;
  }
  return empty;
}

function isValid(type, value, emptyField) {
  if (emptyField === false) {
    const pattern = new RegExp(defaultValidationPatterns[type]);
    return pattern.test(value);
  }

}


export default function fieldValidation(props, validation) {
  let value = props.field.value;
  const type = props.field.getAttribute('type');
  // cheboxes return 'on' as value so change it
  if (type === 'checkbox') {
    value = props.field.checked;
  }
  const emptyField = isEmpty(value, props.fieldProps.required, type);
  // console.log('empty', emptyField);
  // const validPattern = isValid(type, value, emptyField);
  // console.log('validpattern', validPattern);
  // validation = defaultValidation[type].validation(emptyField, value);
  console.log(validation);

  return validation;
}

