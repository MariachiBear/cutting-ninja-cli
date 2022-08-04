import ClipboardListener from 'clipboard-listener';
import clipboard from 'clipboardy';
import urlRegex from 'url-regex-safe';
import { shortThisUrl } from './apiFunctions.js';

/*
 * Create a new instance
 */
const listener = new ClipboardListener();

const listenerOnChange = async (value) => {
  const isUrl = urlRegex({ exact: true }).test(value);
  const isFromAPI = value.includes('https://nnjct.pw');

  let finalCopy = value;

  if (isUrl && !isFromAPI) finalCopy = await shortThisUrl(value);

  clipboard.writeSync(finalCopy);
};

/*
 * Start listening to clipboard changes
 */
listener.on('change', listenerOnChange);
