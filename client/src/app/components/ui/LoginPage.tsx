import * as yup from 'yup';
import { useAppSelector } from '../../store/hook';
import { getUsersLoadingStatus } from '../../store/usersSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginProps } from '../../types/types';
import Card from '../common/Card';
import StyledNavLink from '../common/StyledNavLink';
import TextField from '../common/form/TextField';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import SpinLoading from './SpinLoader';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
});

const LoginPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginProps>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="mb-12 text-slate-900">
      <Card.Title>Login</Card.Title>

      <div className="text-sm text-slate-600">
        or{' '}
        <StyledNavLink to="/auth/signup" styleType="underline">
          start your 14-day free trial
        </StyledNavLink>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-[200px] w-full mb-10">
        <TextField
          field={{ ...register('email') }}
          name="email"
          label="Email"
          error={errors?.email}
          Icon={EnvelopeIcon}
        />
        <TextField
          field={{ ...register('password') }}
          type="password"
          name="password"
          label="Password"
          error={errors?.password}
          Icon={KeyIcon}
        />
        <div className="pt-2">
          <Button isValid={isValid}>{loading && <SpinLoading />}Log In</Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
