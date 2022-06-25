import useSWRMutation from 'swr/mutation';
import fetcher from './fetcher';

export default function useLogin(opts) {
  const {
    data,
    trigger,
    error,
    isMutating,
  } = useSWRMutation(
    'api/v1/assets',
    (url, args) => fetcher(url, { ...args, withAuth: true }, 'post'),
    opts,
  );

  return {
    data,
    error,
    loading: isMutating,
    trigger,
  };
}
