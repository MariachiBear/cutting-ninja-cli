import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import {
  consoleError,
  consoleInfo,
  consoleSuccess,
  __dirname,
} from './utils.js';
/**
 * @description Get the information from the package.json file.
 * @param {String} key The package.json key to retrieve
 * @return {Object} The package.json file as a JSON object
 */
export const getPackage = (key) => {
  const packageString = fs.readFileSync(
    path.join(__dirname, '..', 'package.json')
  );
  const packageJson = JSON.parse(packageString);
  return packageJson[key];
};

/**
 * @description Start the listener process using PM2.
 */
export const init = () =>
  exec('npx pm2 start src/listener.js', (err) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleSuccess('Clipboard listener started successfully');
    process.exit();
  });

/**
 * @description Get the PM2 information for the listener.
 */
export const info = () =>
  exec('npx pm2 l', (err, output) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleInfo(output);
    process.exit();
  });

/**
 * @description Stops and deletes all listeners running.
 */
export const stop = () =>
  exec('npx pm2 stop all && npx pm2 delete all', (err) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleSuccess('Clipboard listener stopped successfully');
    process.exit();
  });
