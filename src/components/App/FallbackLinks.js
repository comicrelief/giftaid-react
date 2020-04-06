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

const fallbackFooterMenuBN = [
	{
		url: 'https://www.comicrelief.com/big-night-in-contact-us',
		title: 'Contact us',
	},
	{
		url: 'https://www.comicrelief.com/big-night-in-legal',
		title: 'Legal',
	},
	{
		url: 'https://www.comicrelief.com/big-night-in-privacy',
		title: 'Privacy',
	},
];

const getFallbackMenuItems = (type) => {
	switch (type) {
		case 'SR':
			return fallbackFooterMenuSR;
		case 'BIGNIGHTIN':
			return fallbackFooterMenuBN;
		default:
			return fallbackFooterMenuCR;
	}
}
export default getFallbackMenuItems;
