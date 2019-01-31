import SiteConfig from '../config/site.json';

const SITE = process.env.REACT_APP_SITE;
const DEFAULT_SITE = 'RNDGIFTAID';

/**
 * SiteService class
 */
export default class SiteService {
  /**
   * SiteService Constructor
   */
  constructor() {
    this.setConfig();
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
}
