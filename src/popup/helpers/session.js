import * as storage from './storage';

export const persist = ({
  accessToken,
  client,
  uid,
}) => (
  storage.set({
    accessToken,
    client,
    tokenType: 'Bearer',
    uid,
  })
);

export const erase = () => (
  storage.clear()
);

export const get = () => (
  storage.get([
    'accessToken',
    'client',
    'tokenType',
    'uid',
  ])
);
