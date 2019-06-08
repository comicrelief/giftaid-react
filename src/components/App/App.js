/* eslint-env browser */
import React, { useEffect, useState} from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TagManager from 'react-gtm-module';
import Raven from 'react-raven';


//Context provider
import { AppProvider } from '../../context/AppContext';

// Site config
import SiteService from '../../service/Site.service';

// Fallback suspense loading
import Loading from "../Loading";


// Lazy load components
const ScrollToTop = React.lazy(() => import('./ScrollToTop/ScrollToTop'));

const CookieConsentMessage = React.lazy(() => import('@comicrelief/storybook/src/components/CookieConsentMessage/CookieConsentMessage'));
const Header = React.lazy(() => import('../Header/Header'));
const Footer = React.lazy(() => import('@comicrelief/storybook/src/components/Footer/Footer'));
const DefaultRoute = React.lazy(() => import('../Routes/DefaultRoute'));
const CompletedRoute = React.lazy(() => import('../Routes/CompletedRoute'));
const GiftAidPage = React.lazy(() => import('../../pages/GiftAid/'));
const Success = React.lazy(() => import('../../pages/Success/Success'));
const Sorry = React.lazy(() => import('../../pages/Sorry/Sorry'));



const site = new SiteService();

function App (props) {

  // Declare state variables
  const [isCompleted, setIsCompleted] = useState(false); // initialise isCompleted state

  const initialState = {
    firstname: undefined,
    giftAidChoice: undefined,
  };
  const [successState, setSuccessState] = useState(initialState); // initialise successState state

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
    setIsCompleted: (status) => setIsCompleted(status),
    successState,
    setSuccessState: (state) => setSuccessState(state),
  };

  return (
    <React.Suspense fallback={<Loading />}>

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
          <AppProvider value={childProps}>
            <ScrollToTop />
            <Switch>

              <Route exact path="/sorry" render={props => <Sorry {...props} />} />
              <CompletedRoute exact path="/success" component={Success} />
              <CompletedRoute
                exact path="/update/success"
                component={Success}
              />
              <Route exact path="/update/sorry" render={props => <Sorry {...props} />}/>
              <DefaultRoute exact path="/update/:transaction_id" component={GiftAidPage} />
              <DefaultRoute exact path="/update" component={GiftAidPage} />
              <DefaultRoute exact path="/" component={GiftAidPage} />
              <Redirect push to="/" />

            </Switch>
          </AppProvider>
        </Router>

        <Footer campaign="comicrelief" copy="copyright 2018" />

      </div>
    </React.Suspense>

  );

}

export default App;
