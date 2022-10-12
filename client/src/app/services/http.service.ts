import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import configFile from '../config.json';
import localStorageService from './localStorage.service';
import authService from './auth.service';

const http: AxiosInstance = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && Number(expiresDate) < Date.now();
    if (isExpired) {
      const data: any = await authService.refresh();
      localStorageService.setTokens(data);
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    res.data = { content: res.data };
    return res;
  },
  (error) => {
    const expectedErrors: boolean =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log('Something was wrong. Try it later');
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
