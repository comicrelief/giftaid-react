/* eslint-env browser */
import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TagManager from 'react-gtm-module';
import Raven from 'react-raven';
import CookieConsentMessage from '@comicrelief/storybook/src/components/CookieConsentMessage/CookieConsentMessage';
import Footer from '@comicrelief/storybook/src/components/Footer/Footer';


import ScrollToTop from './ScrollToTop/ScrollToTop';
import Success from '../../pages/Success/Success';
import Sorry from '../../pages/Sorry/Sorry';
import Update from '../../pages/UpdateForm/UpdateForm';
import Header from '../Header/Header';
import GiftAidForm from '../../pages/GiftAidForm/GiftAidForm';
import UpdateSuccess from '../../pages/UpdateSuccess/UpdateSuccess';
import UpdateSorry from '../../pages/UpdateSorry/UpdateSorry';

class App extends Component {
  constructor() {
    super();

    TagManager.initialize({
      gtmId: 'GTM-TC9H9D',
      dataLayer: {
        site: [{
          category: 'giftaid',
          pageCategory: '',
          pageSubCategory: '',
          environment: process.env.REACT_APP_ENVIRONMENT,
        }],
      },
    });
  }

  render() {
    const giftAidDescription = 'Gift aid your text donation and the UK Government will give Comic Relief 25% on top of ' +
      'your donation. It doesn\t cost you a penny, and helps to keep us going.';
    const metaKeywords = 'Comic Relief Giftaid, Sport Relief Giftaid, Red Nose Day Giftaid';

    return (
      <div className="App">
        <CookieConsentMessage />
        <Header />

        <MetaTags>
          <title>Gift Aid declaration | Comic Relief</title>
          <meta name="description" content={giftAidDescription} />
          <meta property="og:title" content="Gift Aid your donation" />
          <meta property="og:image" content="/images/thank-you-mob.jpg" />
          <meta property="og:site_name" content="Comic Relief" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:description" content={giftAidDescription} />
          <meta name="keywords" content={metaKeywords} />
        </MetaTags>

        <Raven dsn="https://25f53d059e1f488f9d0f000ffd500585@sentry.io/1228720" />

        <Router>
          <div>
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={GiftAidForm} />
              <Route path="/success" component={Success} />
              <Route path="/sorry" component={Sorry} />

              <Route path="/update/success" component={UpdateSuccess} />
              <Route path="/update/sorry" component={UpdateSorry} />

              <Route path="/update/:transaction_id" component={Update} />
              <Route path="/update" component={Update} />

              <Redirect push to="/" />
            </Switch>
          </div>
        </Router>

        <Footer campaign="comicrelief" />

      </div>
    );
  }
}

export default App;
