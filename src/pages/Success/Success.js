import React, { useState, useEffect, useContext } from 'react';

import SiteService from '../../service/Site.service';

// import context
import AppContext from '../../context/AppContext';

// Fallback suspense loading
import Loading from '../../components/Loading';

// lazy load components
const PromoHeader = React.lazy(() => import('../../components/PromoHeader/PromoHeader'));
const ThankYou = React.lazy(() => import('./ThankYou'));
const ImpactMessage = React.lazy(() => import('./ImpactMessage'));

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
    if (typeof state === 'undefined' || app.isCompleted === false) {
      props.history.push({
        pathname: '/',
      });
    }
    return () => {
      setState(null);
    };
  });

  return (
    <React.Suspense fallback={ <Loading />}>
      <div>
        <PromoHeader />
        <div className={`success-wrapper ${additionalClass}`}>
          <div className="success-wrapper--inner">
            <ThankYou/>

            <ImpactMessage />
          </div>
        </div>
      </div>
    </React.Suspense>

  );

};


export default Success;
