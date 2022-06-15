import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useUploadAsset from '../swr/use-upload-asset';
import Button from '../components/button';
import File from '../components/inputs/file';
import Input from '../components/inputs/input';
import ROUTES from '../data/routes';

const Upload = () => {
  const navigate = useNavigate();
  const { trigger } = useUploadAsset({
    onSuccess: () => {
      navigate(ROUTES.home);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      asset: null,
    },
  });
  const watchAsset = watch('asset');

  const doSubmit = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('file', values.asset?.file);

    trigger(formData);
  };

  return (
    <form className="px-4" onSubmit={handleSubmit(doSubmit)}>
      <Input
        id="name"
        label="Name"
        inputProps={register('name', { required: 'Name is required' })}
        wrapperClassName="w-full mt-6"
      />
      <File
        id="asset"
        label="Asset"
        {
          ...register(
            'asset',
            {
              required: 'Asset is required',
            },
          )
        }
        onChange={(file) => setValue('asset', file)}
        onDelete={() => setValue('asset', null)}
        value={watchAsset}
        wrapperClassName="w-full mt-6"
      />

      <Button className="mt-6 w-full" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default Upload;
