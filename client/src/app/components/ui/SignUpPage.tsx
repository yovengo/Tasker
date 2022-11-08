import Card from '../common/Card';
import TextField from '../common/form/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFields } from '../../types/types';
import Button from './Button';
import { useAppSelector } from '../../store/hook';
import { getUsersLoadingStatus } from '../../store/usersSlice';
import SpinLoading from './SpinLoader';

const SignUpPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>();

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Card.Title>SignUp</Card.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-[200px] w-full mb-10">
        <TextField field={{ ...register('name') }} name="name" label="Full name" />
        <div className="pt-2">
          <Button>{loading && <SpinLoading />} Sign Up</Button>
        </div>
      </form>
    </>
  );
};
export default SignUpPage;
