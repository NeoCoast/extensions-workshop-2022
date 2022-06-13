import React from 'react';

import useAuth from '../hooks/use-auth';
import useAssets from '../swr/use-assets';

import Asset from '../components/asset';
import Button from '../components/button';
import Spinner from '../components/spinner';

const Home = () => {
  const { loading: authenticating } = useAuth();
  const { error, assets = [], isLoading } = useAssets();

  if (authenticating || isLoading) return <Spinner />;
  if (error) return 'Error :(';

  return (
    <>
      <h1 className="w-full text-xl flex flex-row items-center justify-between pb-2 mb-4 border-b border-gray-200">
        Assets

        <Button>
          Upload new file +
        </Button>
      </h1>

      <div className="w-full h-full">
        {
          assets.map((asset) => (
            <Asset key={asset.id} {...asset} />
          ))
        }
      </div>
    </>
  );
};

export default Home;
