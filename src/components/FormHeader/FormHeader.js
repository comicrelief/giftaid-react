import React, {useEffect, useState} from 'react';
import FormContext from "../../context/FormContext";

const FormHeader = (props) => {

  // initialise form context
  const formContext = React.useContext(FormContext);

  const [page, setPage] = useState(typeof props.page !== 'undefined' ? props.page : '');
  const [urlTransactionId, setUrlTransactionId] = useState(formContext.urlTransactionId);

  useEffect(() => {
    setPage(props.page);
    setUrlTransactionId(formContext.urlTransactionId);

    return () => {
      setPage(undefined);
      setUrlTransactionId(undefined);
    }
  }, []);

  return (
    <div>
      <h1 className="giftaid-title">
        <span className="visually-hidden">
        Giftaid it
        </span>
      </h1>
      <h2 className="sub-title">
        {page === 'update' ?
          <div>Edit your Gift Aid declaration</div>
          :
          <div>
            Gift aid your donation and the
            {' '}
            <strong>
              Government will give us 25%
            </strong>
            {' '}
            on top of it.
          </div>
        }
      </h2>
      { page === 'update' ?
        <p className="text-align-centre">
          We can claim Gift Aid from personal donations made by UK taxpayers:
          the Government gives us back 25% of their value.
        </p>
        :
        ''
      }
      {typeof urlTransactionId !== 'undefined' && urlTransactionId !== null ?
        <p className="text-align-centre transaction-id">
          Transaction ID: {urlTransactionId}
        </p>
        :
        ''
      }
    </div>
  );
};
export default FormHeader;
