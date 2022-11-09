import React from 'react';
import Card from '../components/common/Card';
import { useAppSelector } from '../store/hook';
import { getIsLoggedIn } from '../store/usersSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  ease: [0, 0.71, 0.2, 1.01],
  duration: 0.8,
  delay: 0.1,
};

const AuthLayout = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const { pathname } = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
      className="flex grow flex-col justify-center items-center dark:text-slate-200 "
    >
      <Card>
        <Outlet />
      </Card>
    </motion.div>
  );
};

export default AuthLayout;
