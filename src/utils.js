import chalk from 'chalk';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const consoleError = (message) => console.log(chalk.red(message));
export const consoleSuccess = (message) => console.log(chalk.green(message));
export const consoleInfo = (message) => console.log(chalk.blue(message));
