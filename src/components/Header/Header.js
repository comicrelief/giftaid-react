import React from 'react';

import Logo from './Logo';
import { url } from '../../pages/GiftAid/utils/Utils';
import SiteConfig from '../../config/site.json';

const Header = () => {
	const isCR = url.includes('comic');
	return (
		<header className='header' role='banner'>
			<div className='header__inner-wrapper'>
				<div id='block-branding' className='block block-branding'>
					<Logo
						href={
							isCR ? SiteConfig.CRGIFTAID.logo : SiteConfig.SRGIFTAID.home_url
						}
						className='site-logo'
						title='Comic Relief'
						rel='home noopener noreferrer'
						logo={isCR ? SiteConfig.CRGIFTAID.logo : SiteConfig.SRGIFTAID.logo}
						alt={isCR ? SiteConfig.CRGIFTAID.alt : SiteConfig.SRGIFTAID.alt}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
