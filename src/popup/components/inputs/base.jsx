import React, { forwardRef } from 'react';
import cn from 'classnames';
import pt from 'prop-types';

const Base = forwardRef((
  {
    className = '',
    ...props
  },
  ref,
) => (
  <input
    className={cn('border-gray-100 border h-10 w-72 rounded px-3 placeholder:font-gray-500 placeholder:text-sm text-sm outline-black', className)}
    ref={ref}
    {...props}
  />
));

Base.propTypes = {
  className: pt.string,
};

export default Base;
