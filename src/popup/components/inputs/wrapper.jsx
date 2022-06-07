import React from 'react';
import cn from 'classnames';
import pt from 'prop-types';

const InputWrapper = ({
  children,
  className = '',
  error = '',
  id,
  label,
}) => (
  <div className={cn('flex flex-col relative mb-4', className)}>
    <label
      className="text-sm font-semibold text-gray-800 pb-2"
      htmlFor={id}
    >
      {label}
    </label>

    {children}

    {
      error && (
        <span className="text-xs font-bold text-rose-500 absolute -bottom-4">
          {error}
        </span>
      )
    }
  </div>
);

InputWrapper.propTypes = {
  children: pt.node.isRequired,
  className: pt.string,
  error: pt.string,
  id: pt.string.isRequired,
  label: pt.node.isRequired,
};

export default InputWrapper;
