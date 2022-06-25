/* eslint-disable import/prefer-default-export */
import * as browser from 'webextension-polyfill';

const download = (options) => {
  browser?.downloads?.download(options);
};

export {
  download,
};
