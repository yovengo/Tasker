import Card from '../common/Card';
import TextField from '../common/form/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFields } from '../../types/types';
import Button from './Button';
import { useAppSelector } from '../../store/hook';
import { getUsersLoadingStatus } from '../../store/usersSlice';
import SpinLoading from './SpinLoader';
import { UserIcon, KeyIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import StyledNavLink from '../common/StyledNavLink';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one capital letter')
    .matches(/(?=.*\d)/, 'Password must contain at least one number')
    .matches(/(?=.{8,})/, 'Password must be at least 8 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .email('Entered value does not match email format'),
  name: yup.string().required('Name is required'),
});

const SignUpPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <Card.Title>Sign Up</Card.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-[200px] w-full mb-10">
        <TextField
          field={{ ...register('name') }}
          name="name"
          label="Username"
          error={errors?.name}
          Icon={UserIcon}
        />
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
          <Button>{loading && <SpinLoading />} Sign Up</Button>
        </div>
      </form>
      <p className="text-slate-600 text-sm">
        <span> Already have account? </span>
        <StyledNavLink to="/auth/login" styleType="underline">
          Log In
        </StyledNavLink>
      </p>
    </>
  );
};
export default SignUpPage;
