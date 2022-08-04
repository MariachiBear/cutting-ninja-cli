import chalk from 'chalk';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/**
 * @description Show text in the console with the error configuration.
 * @param {String} message Text to display
 */
export const consoleError = (message) => console.log(chalk.red(message));

/**
 * @description Show text in the console with the success configuration.
 * @param {String} message Text to display
 */
export const consoleSuccess = (message) => console.log(chalk.green(message));

/**
 * @description Show text in the console with the information configuration.
 * @param {String} message Text to display
 */
export const consoleInfo = (message) => console.log(chalk.blue(message));
