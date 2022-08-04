import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {
  consoleError,
  consoleInfo,
  consoleSuccess,
  __dirname,
} from './utils.js';

const tokenFilePath = path.join(__dirname, '..', '.at');
const userFilePath = path.join(__dirname, '..', '.user');

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
      consoleError(error);
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
      const { accessToken, ...user } = resp.data;
      const bearerToken = `Bearer ${accessToken}`;

      axiosInstance.defaults.headers.common.Authorization = bearerToken;

      fs.writeFileSync(tokenFilePath, bearerToken);
      fs.writeFileSync(userFilePath, JSON.stringify(user));

      return consoleSuccess('Logged successfully');
    })
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          return consoleError('Log in failed because of wrong credentials');
        default:
          return consoleError('Login Error');
      }
    });

  return response;
};

export const logout = () => {
  fs.rmSync(userFilePath, { recursive: true });
  fs.rm(tokenFilePath, { recursive: true }, (err) => {
    if (err) {
      // File deletion failed
      console.error(err.message);
      return;
    }
    axiosInstance.defaults.headers.common.Authorization = '';
    consoleSuccess('Disconnected successfully');
  });
};

export const loginStatus = () => {
  const userString = fs.readFileSync(userFilePath, 'utf8');
  const userJson = JSON.parse(userString);
  Object.keys(userJson).forEach((key) => {
    consoleInfo(`${key} = ${userJson[key]}`);
  });
};
