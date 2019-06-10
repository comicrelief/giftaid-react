import React, { useEffect, useState } from 'react';


import Loading from '../Loading';

const SubmitHeader = React.lazy(() => import('./Submit'));
const UpdateHeader = React.lazy(() => import('./Update'));

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
      <React.Suspense fallback={ <Loading /> }>
        { page === 'update' ?

          <UpdateHeader />
          :
          <SubmitHeader />
        }
      </React.Suspense>

    </div>
  );
};
export default FormHeader;
