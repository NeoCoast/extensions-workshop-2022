import React from 'react';

import useAuth from '../hooks/useAuth';

const Home = () => {
  const { loading } = useAuth();

  if (loading) return 'Loading';

  return (
    <h1 className="text-3xl">
      Home
    </h1>
  );
};

export default Home;
