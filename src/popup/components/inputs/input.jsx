import React from 'react';
import pt from 'prop-types';

import Wrapper from './wrapper';
import Base from './base';

const Input = ({
  className = '',
  error = '',
  id,
  inputProps = {},
  label,
  placeholder = '',
  type = 'text',
  wrapperClassName = '',
}) => (
  <Wrapper
    className={wrapperClassName}
    error={error}
    id={id}
    label={label}
  >
    <Base
      className={className}
      error={error}
      id={id}
      placeholder={placeholder}
      type={type}
      {...inputProps}
    />
  </Wrapper>
);

Input.propTypes = {
  className: pt.string,
  error: pt.string,
  inputProps: pt.object,
  id: pt.string.isRequired,
  label: pt.string.isRequired,
  placeholder: pt.string,
  type: pt.oneOf(['text', 'password']),
  wrapperClassName: pt.string,
};

export default Input;
