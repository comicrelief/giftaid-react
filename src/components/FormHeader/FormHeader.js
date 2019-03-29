import React from 'react';

const FormHeader = (props) => {
  const page = typeof props.page !== 'undefined' ? props.page : '';
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
      {typeof props.urlTransID !== 'undefined' ?
        <p className="text-align-centre transaction-id">
          Transaction ID: {props.urlTransID}
        </p>
        :
        ''
      }
    </div>
  );
};
export default FormHeader;
