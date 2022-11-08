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

const SignUpPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const { register, handleSubmit } = useForm<SignUpFields>();

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Card.Title>Sign Up</Card.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-[200px] w-full mb-10">
        <TextField field={{ ...register('name') }} name="name" label="Username" Icon={UserIcon} />
        <TextField
          field={{ ...register('email') }}
          name="email"
          label="Email"
          Icon={EnvelopeIcon}
        />
        <TextField
          field={{ ...register('password') }}
          type="password"
          name="password"
          label="Password"
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
