/* eslint-env browser */
import React, { useEffect, useState } from 'react';
import {
	Redirect,
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TagManager from 'react-gtm-module';
import Raven from 'react-raven';

// import components
import Footer from '@comicrelief/storybook/src/components/Footer/Footer';

import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Header from '../Header/Header';
import DefaultRoute from '../Routes/DefaultRoute';
import CompletedRoute from '../Routes/CompletedRoute';
import GiftAidPage from '../../pages/GiftAid';
import Success from '../../pages/Success/Success';
import Sorry from '../../pages/Sorry/Sorry';

//Context provider
import { AppProvider } from '../../context/AppContext';

// Site config
import SiteService from '../../service/Site.service';

const site = new SiteService();

function App(props) {
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
		getGTM(); // Initialise GTM on component mount
	}, []);

	/**
	 * Initialise gtm snippet
	 */
	const getGTM = () => {
		TagManager.initialize({
			gtmId: site.get('GTM').id,
			dataLayer: {
				site: [
					{
						category: 'giftaid',
						pageCategory: site.get('GTM').application,
						pageSubCategory: '',
						environment: process.env.REACT_APP_ENVIRONMENT,
					},
				],
			},
		});

		TagManager.dataLayer({
			dataLayer: {
				user: {
					userEmail: 'N',
				},
				event: 'custUserEmail',
			},
		});
	};

	const childProps = {
		isCompleted,
		setIsCompleted: status => setIsCompleted(status),
		successState,
		setSuccessState: state => setSuccessState(state),
	};

	const isSRCampaign = true;

	const copy = isSRCampaign
		? `Sport Relief is an initiative of Comic Relief. Comic Relief is the trading name of Charity Projects, a registered charity in England and Wales (326568) and Scotland (SC039730), which is a company limited by
	guarantee registered in England and Wales (01806414). Registered address: 89 Albert Embankment, London SE1 7TP.`
		: 'Comic Relief is the trading name of Charity Projects, a registered charity in England and Wales (326568) and Scotland (SC039730), which is a company limited by guarantee registered in England and Wales (01806414). Registered address: 1st Floor, 89 Albert Embankment, London, SE1 7TP.';

	const fallbackFooterMenuCR = [
		{
			url: 'https://lite.comicrelief.com/legal/privacy-notice',
			title: 'Privacy notice',
		},
		{
			url: 'https://lite.comicrelief.com/legal/',
			title: 'Legal',
		},
	];

	const fallbackFooterMenuSR = [
		{
			url: 'https://lite.sportrelief.com/terms-of-use',
			title: 'Legal',
		},
		{
			url: 'https://lite.sportrelief.com/privacy-notice',
			title: 'Privacy notice',
		},
	];

	const fallbackMenu = isSRCampaign
		? fallbackFooterMenuSR
		: fallbackFooterMenuCR;

	return (
		<div className="App">
			<Header />

			<MetaTags>
				<title>Gift Aid declaration | Comic Relief</title>
				<meta name="description" content={site.get('meta').description} />
				<meta property="og:url" content={window.location.href} />
				<meta
					property="og:description"
					content={site.get('meta').description}
				/>
				<meta name="keywords" content={site.get('meta').keywords} />
			</MetaTags>

			<Raven dsn="https://25f53d059e1f488f9d0f000ffd500585@sentry.io/1228720" />

			<Router>
				<AppProvider value={childProps}>
					<ScrollToTop />
					<Switch>
						<Route exact path="/sorry" render={props => <Sorry {...props} />} />
						<CompletedRoute exact path="/success" component={Success} />
						<CompletedRoute exact path="/update/success" component={Success} />
						<Route
							exact
							path="/update/sorry"
							render={props => <Sorry {...props} />}
						/>
						<DefaultRoute
							exact
							path="/update/:transaction_id"
							component={GiftAidPage}
						/>
						<DefaultRoute exact path="/update" component={GiftAidPage} />
						<DefaultRoute exact path="/:token" component={GiftAidPage} />
						<DefaultRoute exact path="/" component={GiftAidPage} />
						<Redirect push to="/" />
					</Switch>
				</AppProvider>
			</Router>

			<Footer copy={copy} campaign={!isSRCampaign ? 'sportrelief' : 'comicrelief'} fallbackMenu={fallbackMenu} />
		</div>
	);
}

export default App;
