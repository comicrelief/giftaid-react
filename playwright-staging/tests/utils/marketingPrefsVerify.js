const { request } = require('../lib/request');

const reportingUrl = process.env.CONTACT_SERVICE_MARKETING_PREFERENCES_REPORTING_BASE_URL;
const apiKey = process.env.CONTACT_SERVICE_REPORTING_API_KEY;

class MarketingPrefsVerify {
  /**
   * Retrieves marketing preferences data for the specified email and returns it.
   * @param {string} email - The email address to fetch marketing preferences for.
   * @returns {Promise<Object>} The marketing preferences data.
   */
  static async get(email) {
    const url = `${reportingUrl}/marketing-preferences/${email}`;
    const headers = { 'x-api-key': apiKey };

    try {
      const data = await request({ url, headers, retries: 5, sleep: 10000 });
      return data; // Return the data directly as a Promise
    } catch (error) {
      console.error('Error fetching marketing preferences:', error);
      throw error; // Re-throw the error
    }
  }
}

module.exports = { MarketingPrefsVerify };
