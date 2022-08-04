#!/usr/bin/env node
import { program } from 'commander';
import { logIn, loginStatus, logout } from './apiFunctions.js';
import { getPackage, info, init, stop } from './functions.js';

program
  .name('nnjct')
  .version(getPackage().version)
  .description("Cutting Ninja CLI to short your URL's as you copy them");

program
  .command('login')
  .argument('[email]', 'Your user email address.')
  .argument('[password]', 'Your user password.')
  .option('-i, --info', 'Show your login information')
  .description("Login into the system to save the generated URL's as yours")
  .action(async (email, password, options) => {
    if (options.info) loginStatus();
    else logIn(email, password);
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
