/* eslint-env browser */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TagManager from 'react-gtm-module';
import Raven from 'react-raven';

import Footer from '@comicrelief/storybook/src/components/Footer/Footer';
import CookieConsentMessage from '@comicrelief/storybook/src/components/CookieConsentMessage/CookieConsentMessage';
import Home from '../../pages/Home/home';
import Header from '../Header/Header';
import './App.scss';

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
            <Route exact path="/" component={Home} />
          </div>
        </Router>

        <Footer campaign="comicrelief" />

      </div>
    );
  }
}

export default App;
