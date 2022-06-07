import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../data/routes';
import * as session from '../helpers/session';

export default () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const { accessToken } = await session.get();

      if (accessToken) {
        setLoading(false);
      } else {
        navigate(ROUTES.login, { replace: true });
      }
    };

    loadAuth();
  }, []);

  return { loading };
};
