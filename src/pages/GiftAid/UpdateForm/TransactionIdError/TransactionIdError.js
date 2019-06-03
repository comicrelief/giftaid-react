import React from 'react';
import browser from 'browser-detect';

const TransactionIdError = (props) => {

  const isBrowser = browser();
  const supportedAriaAttributes = isBrowser.name === 'firefox' && isBrowser.os.match('Windows') ?
    { 'aria-live': 'assertive', 'aria-relevant': 'additions removals' } : { 'aria-live': 'assertive', role: 'status' };

  return (
    <div
      id="field-error--urlTransID"
      className="form__field-error-container form__field-error-container--text"
      {...supportedAriaAttributes}
    >
      { props.urlTransactionIdError ?
        <span className="url-error">{props.transactionIdErrorMessage}</span>
        :
        ''
      }
    </div>
  );
};

export default TransactionIdError;
