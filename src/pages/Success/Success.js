import React, { useState, useEffect, useContext } from 'react';

// import components
import PromoHeader from '../../components/PromoHeader/PromoHeader';
import ThankYou from './ThankYou';
import ImpactMessage from './ImpactMessage';


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

  const redirectPath = props.location.pathname === 'success'
  || props.location.pathname === '/success' ? '/' : '/update';


  useEffect(() => {
    document.title = `Success${site.get('title_postfix')}`;

    if (typeof state === 'undefined' || app.isCompleted === false) {
      props.history.push({
        pathname: redirectPath,
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
          <ThankYou/>

          <ImpactMessage />
        </div>
      </div>
    </div>

  );

};


export default Success;
