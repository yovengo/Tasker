import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './users';
import tasksReducer from './tasks';

const rootReducer = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
