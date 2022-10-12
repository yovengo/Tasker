import httpService from './http.service';

const userEndpoint = 'user/';

const userService = {
  get: async (): Promise<any> => {
    const { data } = await httpService.get(userEndpoint);
    //fix any
    return data;
  },
  create: async (payload): Promise<any> => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    //fix any
    return data;
  },
  update: async (payload): Promise<any> => {
    const { data } = await httpService.put(userEndpoint + 'task', payload);
    //fix any
    return data;
  },
};

export default userService;
