import * as browser from 'webextension-polyfill';

export const set = (items) => (
  browser.storage.local.set(items)
);

export const get = (items) => (
  browser.storage.local.get(items)
);

export const clear = () => (
  browser.storage.local.clear()
);
