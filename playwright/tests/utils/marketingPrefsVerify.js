const { request } = require('../lib/request');

const reportingUrl = process.env.CONTACT_SERVICE_MARKETING_PREFERENCES_REPORTING_BASE_URL;
const apiKey = process.env.CONTACT_SERVICE_REPORTING_API_KEY;

class MarketingPrefsVerify {

  static async get(email, success){
    const url = `${reportingUrl}/marketing-preferences/${email}`;
    const headers = { 'x-api-key': apiKey };
    const data = await request({ url, headers, retries: 5, sleep: 10000 });
    success(data);
  }
}

module.exports = { MarketingPrefsVerify };
