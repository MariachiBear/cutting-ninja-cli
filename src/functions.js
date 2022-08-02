import axios from 'axios';

/**
 * @description
 * @param {string} copyValue
 * @return {string}
 */
export const apiPost = async (copyValue) => {
  const response = axios
    .post('https://nnjct.pw/urls', { longUrl: copyValue })
    .then((resp) => {
      console.log(resp.data);
      const { shortUrl } = resp.data;
      return `https://nnjct.pw/${shortUrl}`;
    })
    .catch((error) => {
      console.log(error);
      return copyValue;
    });

  return response;
};

export const haha = '';
