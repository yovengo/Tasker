import axios, { AxiosInstance } from 'axios';
import localStorageService from './localStorage.service';
import config from '../config.json';
import { Auth } from '../types/types';

const httpAuth: AxiosInstance = axios.create({
  baseURL: config.apiEndpoint + 'auth/',
});

const authService = {
  register: async (payload: Auth): Promise<any> => {
    const { data } = await httpAuth.post('signUp', payload);
    //fix any
    return data;
  },
  login: async ({ email, password }: Auth): Promise<any> => {
    const { data } = await httpAuth.post('signInWithPassword', {
      email,
      password,
    });
    //fix any
    return data;
  },
  refresh: async (): Promise<any> => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    //fix any
    return data;
  },
};

export default authService;
