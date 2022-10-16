import axios, { AxiosInstance } from 'axios';
import localStorageService from './localStorage.service';
import config from '../config.json';
import { AuthFunc, Tokens } from '../types/types';

const httpAuth: AxiosInstance = axios.create({
  baseURL: config.apiEndpoint + 'auth/',
});

const authService = {
  register: async (payload: AuthFunc): Promise<Tokens> => {
    const { data } = await httpAuth.post('signUp', payload);
    return data;
  },
  login: async ({ email, password }: Partial<AuthFunc>): Promise<Tokens> => {
    const { data } = await httpAuth.post('signInWithPassword', {
      email,
      password,
    });
    return data;
  },
  refresh: async (): Promise<Tokens> => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
