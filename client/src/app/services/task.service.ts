import httpService from './http.service';
import { ServicePromise, Task } from '../types/types';

const taskEndpoint = 'task/';

const taskService = {
  createTask: async (payload: Partial<Task>): Promise<ServicePromise<Task>> => {
    const { data } = await httpService.post(taskEndpoint, payload);
    return data;
  },
  getTasks: async (userId: string): Promise<ServicePromise<Task[]>> => {
    const { data } = await httpService.get(taskEndpoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  updateTask: async (payload: Task): Promise<ServicePromise<Task>> => {
    const { data } = await httpService.patch(taskEndpoint + payload._id, payload);
    return data;
  },
  removeTask: async (taskId: string): Promise<ServicePromise<null>> => {
    const { data } = await httpService.delete(taskEndpoint + taskId);
    return data;
  },
};

export default taskService;
