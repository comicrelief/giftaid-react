import SiteConfig from '../config/site.json';

/**
 * SiteService class
 */
export default class SiteService {
  /**
   * SiteService Constructor
   */
  constructor() {
    this.site = this.getSite();
    this.url = null;
    this.timestamp = null;
    this.config = this.getSiteConfiguration();
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
   * Get the current site
   * @return {string}
   */
  getSite() {
    const hostname = window.location.hostname;

    if (hostname.includes('sportrelief')) {
      return 'SR';
    }

    if (hostname.includes('rednoseday')) {
      return 'RND';
    }

    if (hostname.includes('bignightin')) {
      return 'BIGNIGHTIN';
    }

    return 'CR';
  }

  /**
   * get site configuration
   * @return {*}
   * @private
   */
  getSiteConfiguration() {
    return SiteConfig[this.site];
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
}
