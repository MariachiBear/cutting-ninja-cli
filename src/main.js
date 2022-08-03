#!/usr/bin/env node
import { program } from 'commander';
import { logIn } from './apiFunctions.js';
import { info, init, stop } from './functions.js';

const errorColor = (str) => `\x1b[31m${str}\x1b[0m`;

program
  .name('nnjct')
  .version('2')
  .description("Cutting Ninja CLI to short your URL's as you copy them")
  .configureOutput({
    // Visibly override write routines as example!
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    // Highlight errors in color.
    outputError: (str, write) => write(errorColor(str)),
  });

program
  .command('login')
  .argument('[email]', 'Your user email address.')
  .argument('[password]', 'Your user password.')
  .description(
    "Let you login into the system to save the generated URL's as yours"
  )
  .action(async (email, password) => {
    const resp = await logIn(email, password);
    switch (resp) {
      case 401:
        return program.error('Log in failed because of wrong credentials');
      default:
        return console.log('Logged successfully');
    }
  });

program
  .command('init')
  .description("Start the listener to short your URL's ")
  .action(init);

program
  .command('info')
  .description("Start the listener to short your URL's ")
  .action(info);

program
  .command('stop')
  .description("Start the listener to short your URL's ")
  .action(stop);

program.command('stop').description('Stop the listener').action(stop);

try {
  program.parse(process.argv);
} catch (err) {
  if (err.code === 'commander.unknownOption') {
    console.log();
    program.outputHelp();
  }
}
