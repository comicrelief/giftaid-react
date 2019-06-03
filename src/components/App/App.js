/* eslint-env browser */
import React, {useEffect, useState} from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TagManager from 'react-gtm-module';
import Raven from 'react-raven';

// Components
import CookieConsentMessage from '@comicrelief/storybook/src/components/CookieConsentMessage/CookieConsentMessage';
import Footer from '@comicrelief/storybook/src/components/Footer/Footer';

import ScrollToTop from './ScrollToTop/ScrollToTop';
import Header from '../Header/Header';
import DefaultRoute from '../Routes/DefaultRoute';
import CompletedRoute from '../Routes/CompletedRoute';

// Pages
import GiftAidPage from '../../pages/GiftAid/';
import Success from '../../pages/Success/Success';
import Sorry from '../../pages/Sorry/Sorry';

// Site config
import SiteService from '../../service/Site.service';
const site = new SiteService();

function App (props) {

  // Declare state variables
  const [isCompleted, setIsCompleted] = useState(false); // initialise isCompleted state

  /**
   * App mounts
   */
  useEffect(() => {
    // Initialise GTM on component mount
    getGTM();
  },[]);

  /**
   * Initialise gtm snippet
   */
  const getGTM = () => {
    TagManager.initialize({
      gtmId: site.get('GTM').id,
      dataLayer: {
        site: [{
          category: 'giftaid',
          pageCategory: site.get('GTM').application,
          pageSubCategory: '',
          environment: process.env.REACT_APP_ENVIRONMENT,
        }],
      },
    });
  };


  const childProps = {
    isCompleted,
    submitted: (status) => setIsCompleted(status),
  };

  return (
    <div className="App">
      <CookieConsentMessage />
      <Header />

      <MetaTags>
        <title>
          Gift Aid declaration | Comic Relief
        </title>
        <meta name="description" content={site.get('meta').description} />
        <meta property="og:title" content="Gift Aid your donation" />
        <meta property="og:image" content="/images/thank-you-mob.jpg" />
        <meta property="og:site_name" content="Comic Relief" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:description" content={site.get('meta').description} />
        <meta name="keywords" content={site.get('meta').keywords} />
      </MetaTags>

      <Raven dsn="https://25f53d059e1f488f9d0f000ffd500585@sentry.io/1228720" />

      <Router>
        <div>
          <ScrollToTop />
          <Switch>

            <Route exact path="/sorry" component={Sorry} />
            <CompletedRoute exact path="/success" component={Success} props={childProps} />
            <CompletedRoute
              exact path="/update/success"
              component={Success}
              props={childProps}
            />
            <Route exact path="/update/sorry" component={Sorry} />
            <DefaultRoute exact path="/update/:transaction_id" component={GiftAidPage} props={childProps} />
            <DefaultRoute exact path="/update" component={GiftAidPage} props={childProps} />
            <DefaultRoute exact path="/" component={GiftAidPage} props={childProps} />
            <Redirect push to="/" />

          </Switch>
        </div>
      </Router>

      <Footer campaign="comicrelief" copy="copyright 2018" />

    </div>
  );

}

export default App;
