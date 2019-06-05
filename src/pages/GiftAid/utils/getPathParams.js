const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL;

/**
 * Create endpoint params for form submission
 * based on form type
 * @param update
 * @param confirm
 */
export const getPathParams = (update = false, confirm = null) => {
  return {
    endpoint: typeof update !== 'undefined' && update ? ENDPOINT_URL + 'update' : ENDPOINT_URL,
    successPath: typeof update !== 'undefined' && update ? '/update/success' : '/success',
    giftAidChoice: typeof confirm !== 'undefined' && confirm !== null ? confirm : null,
    sorryPath: typeof update !== 'undefined' && update ? '/update/sorry' : '/sorry',
  };
};

