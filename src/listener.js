import ClipboardListener from 'clipboard-listener';
import clipboard from 'clipboardy';
import urlRegex from 'url-regex-safe';
import { shortThisUrl } from './apiFunctions.js';

const listener = new ClipboardListener();
/**
 * @description Defines what to do when there is a change in the clipboard contents.
 * @param {string} value Clipboard copied value
 */
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
