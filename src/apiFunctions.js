import axios from 'axios';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tokenFilePath = path.join(__dirname, '..', '.at');

const axiosInstance = axios.create({
  baseURL: 'https://nnjct.pw',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (fs.existsSync(tokenFilePath)) {
  const token = fs.readFileSync(tokenFilePath, 'utf8');
  axiosInstance.defaults.headers.common.Authorization = token;
}

/**
 * @description
 * @param {string} copyValue
 * @return {Promise<string>}
 */
export const shortThisUrl = async (copyValue) => {
  const response = axiosInstance
    .post('/urls', { longUrl: copyValue })
    .then((resp) => {
      const { shortUrl } = resp.data;
      return `https://nnjct.pw/${shortUrl}`;
    })
    .catch((error) => {
      console.log(error);
      return copyValue;
    });

  return response;
};

/**
 * @description
 * @param {string} email
 * @param {string} password
 * @return {Promise<true | number>}
 */
export const logIn = async (email, password) => {
  const response = axiosInstance
    .post('/users/sign-in', { email, password })
    .then((resp) => {
      const { accessToken } = resp.data;
      const bearerToken = `Bearer ${accessToken}`;

      axiosInstance.defaults.headers.common.Authorization = bearerToken;

      fs.writeFileSync(tokenFilePath, bearerToken);

      return true;
    })
    .catch((error) => error.response.status);

  return response;
};
