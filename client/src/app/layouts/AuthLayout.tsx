import React from 'react';
import Card from '../components/common/Card';
import { useAppSelector } from '../store/hook';
import { getIsLoggedIn } from '../store/usersSlice';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex grow flex-col justify-center items-center">
      <Card>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
