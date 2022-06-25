import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/use-auth';
import useAssets from '../swr/use-assets';

import Asset from '../components/asset';
import Button from '../components/button';
import Spinner from '../components/spinner';
import routes from '../data/routes';

const Home = () => {
  const { loading: authenticating } = useAuth();
  const { error, assets = [], isLoading } = useAssets();

  if (authenticating || isLoading) return <Spinner />;
  if (error) return 'Error :(';

  return (
    <>
      <h1 className="w-full text-xl flex flex-row items-center justify-between pb-2 px-4 pt-4 border-b border-gray-200">
        Assets

        <Button
          as={Link}
          className="flex items-center justify-center"
          to={routes.upload}
        >
          Upload new file +
        </Button>
      </h1>

      <div className="w-full overflow-scroll px-4 pt-2 pb-0">
        {
          assets.length === 0 ? (
            'No assets :('
          ) : (
            assets.map((asset) => (
              <Asset key={asset.id} {...asset} />
            ))
          )
        }
      </div>
    </>
  );
};

export default Home;
