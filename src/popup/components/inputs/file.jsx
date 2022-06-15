import React from 'react';
import pt from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Wrapper from './wrapper';

import plus from '../../assets/plus.svg';
import trash from '../../assets/trash.svg';

const File = React.forwardRef((
  {
    error = false,
    fileType = 'image/jpeg, image/png',
    id,
    label,
    onChange,
    onDelete,
    placeholder = '',
    value,
    wrapperClassName,
    ...props
  },
  ref
) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: fileType,
    maxFiles: 1,
    onDrop: ([file]) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event?.target?.result) return;
        if (typeof event.target.result !== 'string') return;
        onChange({
          file,
          name: file?.name,
          url: URL.createObjectURL(file),
        });
      };
      reader.readAsBinaryString(file);
    },
  });

  return (
    <Wrapper
      className={wrapperClassName}
      error={error}
      id={id}
      label={label}
    >
      <div
        className="border-gray-100 border h-36 w-full rounded placeholder:font-gray-500 placeholder:text-sm outline-black cursor-pointer flex items-center justify-center relative"
        {...getRootProps()}
        {...props}
      >
        {
          value ? (
            <>
              <img
                alt="Selected"
                className="h-36 2-full rounded aspect-square object-contain"
                src={value?.url}
              />

              <button
                className="absolute -translate-y-1/2 -right-6 top-1/2"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onDelete(ev);
                }}
                type="button"
              >
                <img
                  alt="Delete"
                  src={trash}
                />
              </button>
            </>
          ) : (
            <>
              <input ref={ref} id={id} {...getInputProps()} />
              <img
                alt="Add"
                src={plus}
              />
              <span>
                {placeholder}
              </span>
            </>
          )
        }
      </div>
    </Wrapper>
  );
});

File.propTypes = {
  error: pt.bool,
  fileType: pt.string,
  id: pt.string,
  label: pt.string.isRequired,
  onDelete: pt.func.isRequired,
  onChange: pt.func.isRequired,
  placeholder: pt.string,
  value: pt.shape({ name: pt.string, url: pt.string }),
  wrapperClassName: pt.string,
};

export default File;
