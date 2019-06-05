import React, { useState, useEffect, useContext } from 'react';
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import SiteService from '../../service/Site.service';

// import context
import AppContext from '../../context/AppContext';

const Success = (props) => {

  // get context
  const app = useContext(AppContext);

  const site = new SiteService();

  // initialise state with prop from context
  const [state, setState] = useState(app.successState);

  const additionalClass = props.location.pathname === 'success'
  || props.location.pathname === '/success' ? '' : 'update-success-wrapper';


  useEffect(() => {
    document.title = `Success${site.get('title_postfix')}`;
    if (typeof app.successState === 'undefined' || app.isCompleted === false) {
      props.history.push({
        pathname: '/',
      });
    }
    return () => {
      setState(null);
    };
  });

  return (
    <div>
      <PromoHeader />
      <div className={`success-wrapper ${additionalClass}`}>
        <div className="success-wrapper--inner">

          {state && state.firstname !== undefined && (state.giftAidChoice === '1'
            || state.giftAidChoice === undefined
            || state.giftAidChoice === null)
            ? (
              <div>
                <h1>Thank you, <br /> {state.firstname}!</h1>
                <p>
                  We’ve registered your Gift Aid declaration,
                  we’ll use it to pay for our operational costs.
                </p>
              </div>
            )
            : null }

          {state && state.giftAidChoice === '0'
            ? (
              <div>
                <h1>Thanks for letting us know</h1>
                <p>
                  We won’t claim Gift Aid for your donation
                </p>
              </div>
            )
            : null }

          <h2>Your donation makes a big difference</h2>
          <p>
            Comic Relief currently supports more than 2,000 projects in the UK and around
            the world, tackling issues like gender injustice and mental illness.
          </p>
          <div>
            <a href="https://www.comicrelief.com/your-impact" className="btn btn--red">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );

};


export default Success;
