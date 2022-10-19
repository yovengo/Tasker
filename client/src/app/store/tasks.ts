import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Normalized, Task, TasksInitial } from '../types/types';
import { AppDispatch } from './createStore';
import axios from 'axios';
import taskService from '../services/task.service';
import { normalizeData } from '../utils/normalizeData';

const initialState: TasksInitial = {
  entities: null,
  isLoading: true,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    tasksRequested: (state) => {
      state.isLoading = true;
    },
    tasksReceived: (state, action: PayloadAction<Normalized<Task>>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    tasksRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    taskCreated: (state, action: PayloadAction<Task>) => {
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
    taskUpdateSucceed: (state, action: PayloadAction<Task>) => {
      if (state.entities) state.entities.byId[action.payload._id] = action.payload;
    },
    taskRemoved: (state, action: PayloadAction<string>) => {
      if (state.entities) {
        delete state.entities.byId[action.payload];
        state.entities.allIds = state.entities.allIds.filter((taskId) => taskId !== action.payload);
      }
    },
  },
});

const { reducer: tasksReducer, actions } = tasksSlice;
const { tasksRequested, tasksReceived, tasksRequestFailed, taskCreated, taskRemoved } = actions;

const addTaskRequested = createAction('tasks/addTaskRequested');
const removeTaskRequested = createAction('tasks/removeTaskRequested');

export const loadTasksList = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(tasksRequested());
  try {
    const { content } = await taskService.getTasks(userId);
    const normalizedContent = normalizeData<Task>(content);
    dispatch(tasksReceived(normalizedContent));
  } catch (error) {
    if (axios.isAxiosError(error)) dispatch(tasksRequestFailed(error.message));
  }
};

export const createTask = (payload: Partial<Task>) => async (dispatch: AppDispatch) => {
  dispatch(addTaskRequested());
  try {
    const { content } = await taskService.createTask(payload);
    dispatch(taskCreated(content));
  } catch (error) {
    dispatch(removeTaskRequested());
  }
};

export default tasksReducer;
