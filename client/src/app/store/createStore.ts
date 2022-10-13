import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './users';

const rootReducer = combineReducers({
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
