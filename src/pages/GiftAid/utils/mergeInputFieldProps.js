
/**
 * Merge default input field properties with overrides.
 * @param defaultInputFieldsProps
 * @param props
 * @returns {object}
 */
export const mergeInputFieldProps = (defaultInputFieldsProps, props) => {
  const inputFields = defaultInputFieldsProps;
  const overrides = props.inputFieldOverrides;
  Object.entries(overrides).forEach(([key]) => {
    Object.assign(inputFields[key], overrides[key]);
  });
  return inputFields;
};
