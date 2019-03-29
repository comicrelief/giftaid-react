import SiteConfig from '../config/site.json';

const SITE = process.env.REACT_APP_SITE;
const DEFAULT_SITE = 'CRGIFTAID';

/**
 * SiteService class
 */
export default class SiteService {
  /**
   * SiteService Constructor
   */
  constructor() {
    this.setConfig();
    this.url = null;
    this.timestamp = null;
    this.campaign = null;
  }

  /**
   * Get a config variable
   * @param param
   * @return {null}
   */
  get(param) {
    return typeof this.config[param] !== 'undefined' ? this.config[param] : null;
  }

  /**
   * Get Site
   * @return {*}
   */
  getSite() {
    return this.site;
  }

  /**
   * Set configuration
   * @return {*}
   * @private
   */
  setConfig() {
    if (typeof SiteConfig[SITE] !== 'undefined') {
      this.site = SITE;
      return this.config = SiteConfig[SITE];
    }

    this.site = DEFAULT_SITE;
    return this.config = SiteConfig[DEFAULT_SITE];
  }

  /**
   * Gets the current hostname.
   * Replaces 'localhost' to a default or uses the browser's current url.
   * @return string
   */
  getCurrentUrl() {
    if (window.location.hostname === 'localhost') {
      this.url = 'http://local.comicrelief.com';
    } else {
      this.url = window.location.protocol + '//' + window.location.host + '/';
    }
    return this.url;
  }


  /**
   * Gets the timestamp and formats it
   * @return string
   */
  getTimestamp() {
    this.timestamp = Math.floor(Date.now() / 1000);
    return this.timestamp;
  }


  /**
   * Gets the campaign name based on the url
   * @param url
   * @return {*}
   */
  getCampaign(url) {
    // let campaign;
    if (url.includes('sportrelief')) {
      this.campaign = 'SR18';
    } else if (url.includes('rednoseday')) {
      this.campaign = 'RND19';
    } else {
      this.campaign = 'CR';
    }
    return this.campaign;
  }
}

