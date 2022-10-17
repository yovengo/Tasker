import httpService from './http.service';
import { ServicePromise, User } from '../types/types';
import localStorageService from './localStorage.service';

const userEndpoint = 'user/';

const userService = {
  get: async (): Promise<ServicePromise<User[]>> => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  update: async (payload: Partial<User>): Promise<ServicePromise<User>> => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};

export default userService;
