import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import * as session from '../helpers/session';

const client = applyCaseMiddleware(axios.create({
  baseURL: 'http://localhost:4000',
}));

const fetcher = async (
  url,
  { arg, withAuth } = { arg: null, withAuth: true },
  method = 'get',
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (withAuth) {
    const sessionData = await session.get();
    headers['Access-Token'] = sessionData.accessToken;
    headers.Client = sessionData.client;
    headers.Uid = sessionData.uid;
    headers['Token-Type'] = sessionData.tokenType || 'Bearer';
  }

  let params = [];
  if (method === 'get') {
    params = [url, { headers }];
  } else {
    params = [url, arg, { headers }];
  }

  return (
    client[method](...params)
      .then(({ data, headers: resHeaders }) => ({ data, headers: resHeaders }))
  );
};

export default fetcher;
