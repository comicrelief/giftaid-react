const axios = require('axios');
const { retry } = require('@comicrelief/test-utils/utils');

const request = async ({ url, throwToRetry = () => {}, method = 'GET', data = null, headers = null, retries = 14, sleep = 10000 }) => {
  const attempt = async () => {
    console.log(`new attempt at ${url.split('?')[0]}`);

    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    const entry = response.data.data;

    throwToRetry(entry);

    return entry;
  };

  const entry = await retry(
    attempt,
    retries,
    sleep,
  );

  return entry;
};

module.exports = {
  request,
};
