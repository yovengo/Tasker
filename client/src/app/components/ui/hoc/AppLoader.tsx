import React, { useEffect } from 'react';
import { AppLoaderProps } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import {
  getCurrentUserId,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from '../../../store/usersSlice';
import { getTasksLoadingStatus, loadTasksList } from '../../../store/tasksSlice';

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const userId = useAppSelector(getCurrentUserId());

  const tasksLoadingStatus = useAppSelector(getTasksLoadingStatus());
  const usersLoadingStatus = useAppSelector(getUsersLoadingStatus());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadTasksList(userId));
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (tasksLoadingStatus && usersLoadingStatus) return 'Loading...';
  return children;
};
export default AppLoader;
