import httpService from './http.service';
import { User } from '../types/types';
import localStorageService from './localStorage.service';

const userEndpoint = 'user/';

const userService = {
  get: async (): Promise<any> => {
    const { data } = await httpService.get(userEndpoint);
    //fix any
    return data;
  },
  update: async (payload: Partial<User>): Promise<any> => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    //fix any
    return data;
  },
};

export default userService;
