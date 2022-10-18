// services
export type User = {
  _id?: string;
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
  _id?: string;
  name: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  userId: string;
};

export type LocalStorageFunc = string | null;

export type ServicePromise<T> = Record<'content', T>;

// usersReducer
export type Initial = {
  entities: Normalized | null;
  isLoading: boolean;
  error: string | null;
  auth: AuthField;
  isLoggedIn: boolean;
};

export type Normalized = {
  byId: Record<string, User>;
  allIds: string[];
};

export type AuthField = { userId: LocalStorageFunc } | null;

export type ErrorFields = { code: number; message: string };
