import React from 'react';
import { ProtectedRouteProps } from '../../types/types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { getIsLoggedIn } from '../../store/usersSlice';

const ProtectedRoute = ({ children, redirectTo = '/auth/login' }: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  if (!isLoggedIn) return <Navigate to={redirectTo} state={{ referrer: location }} />;
  return children;
};
export default ProtectedRoute;
