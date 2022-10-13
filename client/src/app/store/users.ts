import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import { generateAuthError } from '../utils/generateAuthError';
import { Initial } from '../types/types';

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userUpdated: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userCreated,
  userUpdated,
  userLoggedOut,
  authRequested,
  authRequestFailed,
  authRequestSuccess,
} = actions;

export default usersReducer;
