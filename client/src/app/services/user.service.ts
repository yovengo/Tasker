import httpService from './http.service';
import { Tasks } from '../types/types';

const userEndpoint = 'user/';

const userService = {
  get: async (): Promise<any> => {
    const { data } = await httpService.get(userEndpoint);
    //fix any
    return data;
  },
  update: async (payload: Tasks): Promise<any> => {
    const { data } = await httpService.put(userEndpoint + 'task', payload);
    //fix any
    return data;
  },
};

export default userService;
