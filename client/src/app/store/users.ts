// Redux
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './createStore';
// Libraries
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Services
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
// Types
import { AuthField, ErrorFields, UsersState, Normalized, Tokens, User } from '../types/types';
// Utils
import { generateAuthError } from '../utils/generateAuthError';
import { normalizeData } from '../utils/normalizeData';

const initialState: UsersState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };
const navigate = useNavigate();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action: PayloadAction<Normalized<User>>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action: PayloadAction<AuthField>) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userUpdateSucceed: (state, action: PayloadAction<User>) => {
      if (state.entities) state.entities.byId[action.payload._id] = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userUpdateSucceed,
  userLoggedOut,
  authRequested,
  authRequestFailed,
  authRequestSuccess,
} = actions;

const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

export const signUp =
  (payload: User) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(authRequested());
    try {
      const data: Awaited<Tokens> = await authService.register(payload);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) dispatch(authRequestFailed(error.message));
    }
  };

export const signIn =
  (payload: Partial<User>) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data: Awaited<Tokens> = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { code, message }: ErrorFields = error.response?.data.error;
        if (code === 400) {
          const errorMessage = generateAuthError(message);
          dispatch(authRequestFailed(errorMessage));
        } else {
          dispatch(authRequestFailed(error.message));
        }
      }
    }
  };

export const updateUser =
  (payload: Partial<User>) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSucceed(content));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) dispatch(userUpdateFailed());
    }
  };

export const logOut = () => (dispatch: AppDispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  navigate('/');
};

export const loadUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    const normalizedContent = normalizeData<User>(content);
    dispatch(usersReceived(normalizedContent));
  } catch (error) {
    if (axios.isAxiosError(error)) dispatch(usersRequestFailed(error.message));
  }
};

export const getCurrentUser = () => (state: RootState) => state.users.entities?.byId;
export const getCurrentUserId = () => (state: RootState) => state.users.auth!.userId;
export const getUsersLoadingStatus = () => (state: RootState) => state.users.isLoading;
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getAuthError = () => (state: RootState) => state.users.error;

export default usersReducer;
