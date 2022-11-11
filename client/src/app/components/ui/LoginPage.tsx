import * as yup from 'yup';
import { useAppSelector } from '../../store/hook';
import { getUsersLoadingStatus } from '../../store/usersSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginProps } from '../../types/types';
import StyledNavLink from '../common/StyledNavLink';
import TextField from '../common/form/TextField';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import SpinLoading from './SpinLoader';
import { motion } from 'framer-motion';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const LoginPage = () => {
  const loading = useAppSelector(getUsersLoadingStatus());
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginProps>({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
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
          <Button isValid={isValid}>{loading && <SpinLoading />}Log In</Button>
        </motion.div>
      </form>
      <motion.div variants={item} className="text-sm text-slate-600">
        or{' '}
        <StyledNavLink to="/auth/signup" styleType="underline">
          start your 14-day free trial
        </StyledNavLink>
      </motion.div>
    </motion.div>
  );
};
export default LoginPage;
