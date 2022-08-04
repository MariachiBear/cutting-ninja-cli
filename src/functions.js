import { exec } from 'child_process';
import fs from 'fs';
import ospath from 'ospath';
import path from 'path';
import {
  consoleError,
  consoleInfo,
  consoleSuccess,
  __dirname,
} from './utils.js';

const listenerConfig = {
  name: 'ClipboardListener',
  script: './src/listener.js',
  error_file: `${ospath.home()}/.nnjct/logs/XXXerr.log`,
  out_file: `${ospath.home()}/.nnjct/logs/XXXout.log`,
  pid_file: `${ospath.home()}/.nnjct/pid/app-pm_id.pid`,
};

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
export const init = () => {
  fs.writeFileSync(
    path.join(__dirname, '..', 'pm2.json'),
    JSON.stringify(listenerConfig)
  );

  exec('npx pm2 start pm2.json && npx pm2 save --force', (err) => {
    if (err) consoleError('There was an error starting the listener');
    else consoleSuccess('Clipboard listener started successfully');
    process.exit();
  });
};

/**
 * @description Get the PM2 information for the listener.
 */
export const info = () =>
  exec('npx pm2 l ClipboardListener', (err, output) => {
    if (err) consoleError('Clipboard Listener is not currently running');
    else consoleInfo(output);
    process.exit();
  });

/**
 * @description Stops and deletes all listeners running.
 */
export const stop = () =>
  exec(
    'npx pm2 stop ClipboardListener && npx pm2 delete ClipboardListener && npx pm2 save --force',
    (err) => {
      if (err) consoleError('Clipboard Listener is not currently running');
      else consoleSuccess('Clipboard listener stopped successfully');
      process.exit();
    }
  );

/**
 * @description Runs PM2 startup command.
 */
export const enable = () =>
  exec('npx pm2 startup', (err, stdout) => {
    if (err) consoleInfo(stdout);
    else consoleSuccess('Clipboard listener enabled');
    process.exit();
  });

/**
 * @description Runs PM2 unstartup command.
 */
export const disable = () =>
  exec('npx pm2 unstartup', (err, stdout) => {
    if (err) consoleInfo(stdout);
    else consoleSuccess('Clipboard listener enabled');
    process.exit();
  });
