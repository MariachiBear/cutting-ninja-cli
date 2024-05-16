import axios from 'axios';
import fs from 'fs';
import ospath from 'ospath';
import path from 'path';

import { consoleError, consoleInfo, consoleSuccess } from './utils.js';

const cliDir = path.join(ospath.home(), '.nnjct');
const tokenFilePath = path.join(cliDir, '.at');
const userFilePath = path.join(cliDir, '.user');

const axiosInstance = axios.create({
  baseURL: 'https://nnjct.pw',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
/**
 * @description Set the current Authorization token depending on the login information.
 */
const setToken = () => {
  const tokenFileExists = fs.existsSync(tokenFilePath);
  const userFileExists = fs.existsSync(userFilePath);
  if (tokenFileExists && userFileExists) {
    const token = fs.readFileSync(tokenFilePath, 'utf8');
    axiosInstance.defaults.headers.common.Authorization = token;
  } else {
    axiosInstance.defaults.headers.common.Authorization = '';
  }
};

/**
 * @description Send the detected URL to short it with Cutting Ninja.
 * @param {string} copyValue URL copied from the clipboard
 * @return {Promise<string>}
 */
export const shortThisUrl = async (copyValue) => {
  setToken();
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
 * @description Let log in the user to save the shorted URS into their account.
 * @param {string} email User's email
 * @param {string} password User's password
 * @return {Promise<true | number>}
 */
export const logIn = async (email, password) => {
  setToken();
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

/**
 * @description Logs the user out by deleting their local files
 */
export const logout = () => {
  try {
    fs.rmSync(userFilePath, { recursive: true });
    fs.rmSync(tokenFilePath, { recursive: true });
    consoleSuccess('Disconnected successfully');
  } catch (error) {
    consoleSuccess(error);
  }
};

export const loginStatus = () => {
  const tokenFileExists = fs.existsSync(tokenFilePath);
  const userFileExists = fs.existsSync(userFilePath);
  if (tokenFileExists && userFileExists) {
    const userString = fs.readFileSync(userFilePath, 'utf8');
    const userJson = JSON.parse(userString);
    Object.keys(userJson).forEach((key) => {
      consoleInfo(`${key} = ${userJson[key]}`);
    });
  } else {
    consoleInfo('You are currently disconnected');
  }
};
