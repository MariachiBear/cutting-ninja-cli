/* eslint-disable import/extensions */
import ClipboardListener from 'clipboard-listener';
import clipboard from 'clipboardy';
import urlRegex from 'url-regex';
import { apiPost } from './functions.js';

/*
 * Create a new instance
 */
const listener = new ClipboardListener();

/*
 * Start listening to clipboard changes
 */
listener.on('change', (value) => {
  console.log(value);

  const isUrl = urlRegex({ exact: true }).test(value);
  const isFromAPI = value.includes('https://nnjct.pw');

  let finalCopy = value;

  if (isUrl && !isFromAPI) finalCopy = apiPost(value);

  clipboard.writeSync(finalCopy);
  console.log(isUrl);
});
