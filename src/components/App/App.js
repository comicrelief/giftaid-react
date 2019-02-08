/* eslint-env browser */
import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import Raven from 'react-raven';
import CookieConsentMessage from '@comicrelief/storybook/src/components/CookieConsentMessage/CookieConsentMessage';
import Footer from '@comicrelief/storybook/src/components/Footer/Footer';


import ScrollToTop from './ScrollToTop/ScrollToTop';
import Success from '../../pages/Success/Success';
import Sorry from '../../pages/Sorry/Sorry';
import UpdateForm from '../../pages/UpdateForm/UpdateForm';
import Header from '../Header/Header';
import GiftAidForm from '../../pages/GiftAidForm/GiftAidForm';
import UpdateSuccess from '../../pages/UpdateSuccess/UpdateSuccess';
import UpdateSorry from '../../pages/UpdateSorry/UpdateSorry';
import SiteService from '../../service/Site.service';

import AppliedRoute from '../Routes/AppliedRoute';
import CompletedRoute from '../Routes/CompletedRoute';
import UpdateCompletedRoute from '../Routes/UpdateCompletedRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.site = new SiteService();
    this.updateHasCompleted = this.updateHasCompleted.bind(this);
    this.submitHasCompleted = this.submitHasCompleted.bind(this);
    this.state = {
      isCompleted: false,
      isCompleting: true,
      updateCompleted: false,
      updateCompleting: true,
    };
  }

  /**
   * Update has completed
   * @param completed
   */
  updateHasCompleted(completed) {
    this.setState({ updateCompleted: completed }, this.updateCompleting);
  }

  /**
   * Update is completing
   */
  updateCompleting() {
    if (this.state.updateCompleted) {
      this.setState({ updateCompleting: false });
    } else {
      this.setState({ updateCompleting: true });
    }
  }
  /**
   * Submit has completed
   * @param completed
   */
  submitHasCompleted(completed) {
    this.setState({ isCompleted: completed }, this.isCompleting);
  }

  /**
   * Submit is completing
   */
  isCompleting() {
    if (this.state.isCompleted) {
      this.setState({ isCompleting: false });
    } else {
      this.setState({ isCompleting: true });
    }
  }
  render() {
    const childProps = {
      ...this.state,
      updateHasCompleted: this.updateHasCompleted,
      submitHasCompleted: this.submitHasCompleted,
    };
    return (
      <div className="App">
        <CookieConsentMessage />
        <Header />

        <MetaTags>
          <title>
            Gift Aid declaration | Comic Relief
          </title>
          <meta name="description" content={this.site.get('meta').description} />
          <meta property="og:title" content="Gift Aid your donation" />
          <meta property="og:image" content="/images/thank-you-mob.jpg" />
          <meta property="og:site_name" content="Comic Relief" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:description" content={this.site.get('meta').description} />
          <meta name="keywords" content={this.site.get('meta').keywords} />
        </MetaTags>

        <Raven dsn="https://25f53d059e1f488f9d0f000ffd500585@sentry.io/1228720" />

        <Router>
          <div>
            <ScrollToTop />
            <Switch>
              <AppliedRoute exact path="/" component={GiftAidForm} props={childProps} />
              <CompletedRoute path="/success" component={Success} props={childProps} />
              <Route path="/sorry" component={Sorry} />

              <UpdateCompletedRoute
                path="/update/success"
                component={UpdateSuccess}
                props={childProps}
              />
              <Route path="/update/sorry" component={UpdateSorry} />

              <AppliedRoute
                path="/update/:transaction_id"
                component={UpdateForm}
                props={childProps}
              />
              <AppliedRoute path="/update" component={UpdateForm} props={childProps} />

              <Redirect push to="/" />
            </Switch>
          </div>
        </Router>

        <Footer campaign="comicrelief" copy="copyright 2018" />

      </div>
    );
  }
}

export default App;
