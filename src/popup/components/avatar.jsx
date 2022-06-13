import React from 'react';
import cn from 'classnames';
import pt from 'prop-types';

export const AvatarVariant = {
  'XXS': 'xxs',
  'XS': 'xs',
  'S': 's',
};

const classes = {
  xxs: 'w-4 h-4',
  xs: 'w-8 h-8',
  s: 'w-12 h-12',
};

const Avatar = ({
  alt = 'Avatar',
  className = '',
  size = AvatarVariant.S,
  ...props
}) => (
  <img
    className={cn('rounded-full', classes[size], className)}
    alt={alt}
    {...props}
  />
);

Avatar.propTypes = {
  alt: pt.string,
  className: pt.string,
  size: pt.oneOf(Object.values(AvatarVariant)),
};

export default Avatar;
