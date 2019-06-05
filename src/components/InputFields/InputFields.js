import React, {useEffect, useState} from 'react';
import InputField from "@comicrelief/storybook/src/components/InputField";
import FormContext from "../../context/FormContext";

// import defaultInputFieldsData from "../../UpdateForm/defaultUpdateFields";

const InputFields = (props) => {

  // initialise form context
  const formContext = React.useContext(FormContext);

  const [showErrorMessages, setShowErrorMessages] = useState(formContext.showErrorMessages);

  useEffect(() => {
    setShowErrorMessages(formContext.showErrorMessages);
  },[props]);

  const createInputFields = () => {

    const allFields = props.allFields;

    // Remove the transaction id field if not value is present in the url
    if (props.urlTransactionId !== undefined && allFields.transactionId !== undefined) {
      delete allFields.transactionId;
    }
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
      isValid={(state, name) => { formContext.setValidity(state, name); }}
    />));
    return inputFields;
  };

  return createInputFields();
};

export default InputFields;
