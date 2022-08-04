import { init, stop } from './functions.js';

stop().on('exit', init);
