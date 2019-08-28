import React, {useContext, useEffect, useState} from 'react';
import InputField from "@comicrelief/storybook/src/components/InputField";

import FormContext from "../../context/FormContext";


const InputFields = (props) => {

  // initialise context
  const {
    formValidityState,
    setFieldValidity,
  } = useContext(FormContext); // get props from context

  const [showErrorMessages, setShowErrorMessages] = useState(formValidityState.showErrorMessages);

  const [allFields, setAllFields] = useState(props.allFields);

  useEffect(() => {
    setAllFields(props.allFields);
    setShowErrorMessages(formValidityState.showErrorMessages);
  });

  const createInputFields = () => {

    const inputFields = [];
    Object.entries(allFields).map(([field, prop]) => inputFields.push(<InputField
      key={field}
      id={prop.id}
      type={prop.type}
      name={prop.name}
      label={prop.label}
      required={prop.required}
      pattern={prop.pattern}
      placeholder={prop.placeholder}
      min={prop.min}
      max={prop.max}
      defaultChecked={prop.defaultChecked}
      helpText={prop.helpText}
      emptyFieldErrorText={prop.emptyFieldErrorText}
      invalidErrorText={prop.invalidErrorText}
      setBackgroundColor={prop.type === 'checkbox'}
      additionalText={prop.additionalText}
      showErrorMessage={showErrorMessages}
      isValid={(state, name) => setFieldValidity(state, name)}
      fieldValue={prop.fieldValue}
    />));
    return inputFields;
  };

  return createInputFields();
};

export default InputFields;
