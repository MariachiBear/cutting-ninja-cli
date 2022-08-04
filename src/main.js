#!/usr/bin/env node
import { program } from 'commander';
import { logIn, loginStatus, logout } from './apiFunctions.js';
import { getPackage, info, init, stop } from './functions.js';

program
  .name('nnjct')
  .version(getPackage('version'))
  .description("Cutting Ninja CLI to short your URL's as you copy them");

program
  .command('login')
  .option('-i, --info', 'Show your login information')
  .option('-e, --email <email>', 'Set login email')
  .option('-p, --password <password>', 'Set login password')
  .description("Login into the system to save the generated URL's as yours")
  .action(async (options) => {
    if (Object.keys(options).length === 0) program.outputHelp();
    else if (options.info) loginStatus();
    else logIn(options.email, options.password);
  });

program
  .command('logout')
  .description("Logout from the system to save the generated URL's as yours")
  .action(logout);

program
  .command('init')
  .description("Start the listener to short your URL's ")
  .action(init);

program
  .command('info')
  .description("Get information about the listener to short your URL's ")
  .action(info);

program
  .command('stop')
  .description("Stop the listener to short your URL's ")
  .action(stop);

try {
  program.parse(process.argv);
} catch (err) {
  if (err.code === 'commander.unknownOption') {
    program.outputHelp();
  }
}
