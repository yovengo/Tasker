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
import { motion } from 'framer-motion';

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const SignUpPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFields>({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-[200px] w-full mb-5">
        <motion.div variants={item}>
          <TextField
            field={{ ...register('name') }}
            name="name"
            placeholder="Username"
            error={errors?.name}
            Icon={UserIcon}
          />
        </motion.div>
        <motion.div variants={item}>
          <TextField
            field={{ ...register('email') }}
            name="email"
            placeholder="Email"
            error={errors?.email}
            Icon={EnvelopeIcon}
          />
        </motion.div>
        <motion.div variants={item}>
          <TextField
            field={{ ...register('password') }}
            type="password"
            name="password"
            placeholder="Password"
            error={errors?.password}
            Icon={KeyIcon}
          />
        </motion.div>
        <motion.div variants={item} className="pt-2">
          <Button isValid={isValid}>{loading && <SpinLoading />} Sign Up</Button>
        </motion.div>
      </form>
      <motion.p variants={item} className="text-slate-600 text-sm">
        <span> Already have account? </span>
        <StyledNavLink to="/auth/login" styleType="underline">
          Log In
        </StyledNavLink>
      </motion.p>
    </motion.div>
  );
};
export default SignUpPage;
