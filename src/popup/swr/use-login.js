import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';

import fetcher from './fetcher';
import ROUTES from '../data/routes';
import * as session from '../helpers/session';

export default function useLogin() {
  const navigate = useNavigate();
  const {
    data,
    trigger,
    error,
    isMutating,
  } = useSWRMutation(
    'api/v1/auth/sign_in',
    (url, args) => fetcher(url, args, 'post'),
    {
      onSuccess: ({ headers }) => {
        session.persist(headers);
        navigate(ROUTES.home, { replace: true });
      },
      onError: () => {
        session.erase();
      },
    },
  );

  return {
    data,
    error,
    loading: isMutating,
    trigger,
  };
}
