import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import {
  consoleError,
  consoleInfo,
  consoleSuccess,
  __dirname,
} from './utils.js';

export const getPackage = () => {
  const packageString = fs.readFileSync(
    path.join(__dirname, '..', 'package.json')
  );
  const packageJson = JSON.parse(packageString);

  return packageJson;
};

export const init = () =>
  exec('npx pm2 start src/listener.js', (err) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleSuccess('Clipboard listener started successfully');
    process.exit();
  });

export const info = () =>
  exec('npx pm2 l', (err, output) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleInfo(output);
    process.exit();
  });

export const stop = () =>
  exec('npx pm2 stop all && npx pm2 delete all', (err) => {
    if (err) {
      consoleError('could not execute command: ', err);
    }
    consoleSuccess('Clipboard listener stopped successfully');
    process.exit();
  });
