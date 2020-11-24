import React, { useContext } from 'react';
import browser from 'browser-detect';
import FormContext from '../../../context/FormContext';

const isBrowser = browser();

const supportedAriaAttributes = isBrowser.name === 'firefox' && isBrowser.os.match('Windows')
  ? { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' };

const UrlTransactionIdError = props => {
  const { formValidityState: { urlTransactionId } } = useContext(FormContext); // get states from context

  if (urlTransactionId.valid === false) {
    return (
      <div
        id="field-error--urlTransID"
        className="form__field-error-container form__field-error-container--text"
        {...supportedAriaAttributes}
      >
        <span className="url-error">{urlTransactionId.errorMessage}</span>
      </div>
    );
  }
  return null;
};

export default UrlTransactionIdError;
