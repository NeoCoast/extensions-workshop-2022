import React from 'react';
import pt from 'prop-types';

import Avatar, { AvatarVariant } from './avatar';

const Asset = ({
  name,
  url,
  user,
}) => (
  <figure className="flex flex-row justify-start w-full bg-gray-100 rounded border border-gray-200 p-2 mb-2">
    <img
      className="w-20 h-20 object-contain border border border-gray-200 bg-white"
      src={url}
      alt={name}
    />

    <div className="pl-2 text-left flex flex-col">
      <div className="text-lg inline-block truncate">
        {name}
      </div>

      <figcaption className="pt-1 text-xxs flex flex-row flex-wrap items-center">
        <Avatar
          className="mr-1"
          size={AvatarVariant.XXS}
          src={`https://ui-avatars.com/api/?name=${user?.email}`}
        />
        {user?.email}
      </figcaption>
    </div>
  </figure>
);

Asset.propTypes = {
  name: pt.string.isRequired,
  url: pt.string.isRequired,
  user: pt.shape({
    email: pt.string.isRequired,
  }).isRequired,
};

export default Asset;
