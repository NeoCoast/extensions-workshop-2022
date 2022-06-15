import React from 'react';
import cn from 'classnames';
import pt from 'prop-types';

export const ButtonVariant = {
  'Primary': 'primary',
  'Secondary': 'secondary',
  'Clear': 'clear',
};

const classes = {
  [ButtonVariant.Primary]: 'bg-black text-white hover:bg-gray-700',
  [ButtonVariant.Secondary]: 'bg-gray-100 text-black hover:bg-gray-300',
  [ButtonVariant.Clear]: 'border-gray-100 border bg-white text-black hover:bg-gray-300',
};

const Button = ({
  as = 'button',
  children,
  className = '',
  variant = ButtonVariant.Primary,
  ...props
}) => (
  React.createElement(
    as,
    {
      className: cn('h-10 rounded px-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed', classes[variant], className),
      ...props,
    },
    children
  )
);

Button.propTypes = {
  as: pt.elementType,
  children: pt.node,
  className: pt.string,
  variant: pt.oneOf(Object.values(ButtonVariant)),
};

export default Button;
