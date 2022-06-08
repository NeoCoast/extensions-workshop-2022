import React from 'react';
import { useForm } from 'react-hook-form';

import isotipo from '../assets/isotipo.svg';
import Button from '../components/button';
import Input from '../components/inputs/input';
import useLogin from '../swr/use-login';

const Login = () => {
  const { loading, trigger } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className="px-4" onSubmit={handleSubmit(trigger)}>
      <img
        alt="Logo"
        className="w-2/3 m-auto"
        src={isotipo}
      />

      <Input
        error={errors?.email?.message}
        id="email"
        inputProps={register('email', { required: 'Email is required' })}
        label="Email"
        wrapperClassName="w-full mt-6"
      />
      <Input
        error={errors?.password?.message}
        id="password"
        inputProps={register('password', { required: 'Password is required' })}
        label="Password"
        type="password"
        wrapperClassName="w-full mt-6"
      />

      <Button className="mt-6 w-full" disabled={loading} type="submit">
        Log In
      </Button>
    </form>
  );
};

export default Login;
