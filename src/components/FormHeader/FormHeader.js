import React, { useEffect, useState } from 'react';

// import components
import SubmitHeader from './SubmitHeader';
import UpdateHeader from './SubmitHeader';


const FormHeader = (props) => {


  const [page, setPage] = useState(typeof props.page !== 'undefined' ? props.page : '');

  useEffect(() => {
    setPage(props.page);
    return () => {
      setPage(undefined);
    }
  }, []);

  return (
    <div>
      <h1 className="giftaid-title">
        <span className="visually-hidden">
        Giftaid it
        </span>
      </h1>
      <React.Fragment>
        { page === 'update' ?

          <UpdateHeader />
          :
          <SubmitHeader />
        }
      </React.Fragment>

    </div>
  );
};
export default FormHeader;
