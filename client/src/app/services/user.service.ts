import httpService from './http.service';

type UpdatePayload =
  | {
      _id: string;
      status: 'todo' | 'inProgress' | 'done';
      name: string;
      description: string;
    }[]
  | [];

const userEndpoint = 'user/';

const userService = {
  get: async (): Promise<any> => {
    const { data } = await httpService.get(userEndpoint);
    //fix any
    return data;
  },
  update: async (payload: UpdatePayload): Promise<any> => {
    const { data } = await httpService.put(userEndpoint + 'task', payload);
    //fix any
    return data;
  },
};

export default userService;
