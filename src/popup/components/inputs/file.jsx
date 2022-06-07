import React from 'react';
import pt from 'prop-types';
import { useDropzone } from 'react-dropzone';

import plus from '../../assets/plus.svg';
import trash from '../../assets/trash.svg';

const File = ({
  fileType = 'image/jpeg, image/png',
  id,
  onChange,
  onDelete,
  placeholder = '',
  value,
  ...props
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: fileType,
    maxFiles: 1,
    onDrop: ([file]) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event?.target?.result) return;
        if (typeof event.target.result !== 'string') return;

        onChange({
          name: file.name,
          url: URL.createObjectURL(file),
        });
      };
      reader.readAsBinaryString(file);
    },
  });

  return (
    <div
      className="border-gray-100 border h-24 w-24 rounded placeholder:font-gray-500 placeholder:text-sm outline-black cursor-pointer flex items-center justify-center relative"
      {...getRootProps()}
      {...props}
    >
      {
        value ? (
          <>
            <img
              alt="Selected"
              className="rounded aspect-square object-cover"
              src={value?.url}
            />

            <button
              className="absolute -translate-y-1/2 -right-5 top-1/2"
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
            <input id={id} {...getInputProps()} />
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
  );
};

File.propTypes = {
  fileType: pt.string,
  id: pt.string,
  onDelete: pt.func.isRequired,
  onChange: pt.func.isRequired,
  placeholder: pt.string,
  value: pt.shape({ name: pt.string, url: pt.string }),
};

export default File;
