import { exec } from 'child_process';
import { program } from 'commander';

export const init = () =>
  exec('npx pm2 start src/listener.js', (err, output) => {
    if (err) {
      program.error('could not execute command: ', err);
    }
    // log the output received from the command
    console.log('Output: \n', output);
    process.exit();
  });

export const info = () =>
  exec('npx pm2 l', (err, output) => {
    if (err) {
      program.error('could not execute command: ', err);
    }
    // log the output received from the command
    console.log('Output: \n', output);
    process.exit();
  });

export const stop = () =>
  exec('npx pm2 stop all && npx pm2 delete all', (err, output) => {
    if (err) {
      program.error('could not execute command: ', err);
    }
    // log the output received from the command
    console.log('Output: \n', output);
    process.exit();
  });
