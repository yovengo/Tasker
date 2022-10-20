// services
export type User = {
  _id: string;
  email: string;
  name: string;
  password: string;
};

export type Tokens = {
  refreshToken: string;
  accessToken: string;
  userId: string;
  expiresIn: number;
};

export type Task = {
  _id: string;
  name: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  userId: string;
};

export type LocalStorageFunc = string | null;

export type ServicePromise<T> = Record<'content', T>;

// usersReducer
export type UsersState = {
  entities: Normalized<User> | null;
  isLoading: boolean;
  error: string | null;
  auth: AuthField;
  isLoggedIn: boolean;
};

export type TasksState = {
  entities: Normalized<Task> | null;
  isLoading: boolean;
  error: string | null;
};

export type Normalized<T> = {
  byId: Record<string, T>;
  allIds: string[];
};

export type AuthField = { userId: LocalStorageFunc } | null;

export type ErrorFields = { code: number; message: string };
