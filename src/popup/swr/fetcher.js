import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const client = applyCaseMiddleware(axios.create({
  baseURL: '???',
}));

const fetcher = (url, { arg }, method = 'get') => (
  client[method](url, arg)
    .then(({ data, headers }) => ({ data: data.data, headers }))
);

export default fetcher;
