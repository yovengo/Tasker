import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import { generateAuthError } from '../utils/generateAuthError';
import {
  ActionError,
  AuthField,
  ErrorFields,
  Initial,
  Normalized,
  Tasks,
  Tokens,
  User,
} from '../types/types';
import { AppDispatch } from './createStore';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import axios, { AxiosError } from 'axios';

const initialState: Initial = localStorageService.getAccessToken()
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
    usersReceived: (state, action: PayloadAction<Normalized>) => {
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
    userCreated: (state, action: PayloadAction<User>) => {
      if (!state.entities) {
        state.entities = {
          byId: {},
          allIds: [],
        };
      }
      state.entities.byId = {
        ...state.entities.byId,
        [action.payload._id]: action.payload,
      };
      state.entities.allIds.push(action.payload._id);
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
  userCreated,
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

export default usersReducer;
