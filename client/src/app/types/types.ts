// auth.service
export type AuthFunc = {
  email: string;
  name: string;
  password: string;
};

// localStorage.service
export type Tokens = {
  refreshToken: string;
  accessToken: string;
  userId: string;
  expiresIn: number;
};

export type LocalStorageFunc = string | null;

// user.service
export type Tasks =
  | {
      _id: string;
      status: 'todo' | 'inProgress' | 'done';
      name: string;
      description: string;
    }[]
  | [];

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  tasks: Tasks;
};

// usersReducer
export type Initial = {
  entities: null | Normalized;
  isLoading: boolean;
  error: null | string;
  auth: AuthField;
  isLoggedIn: boolean;
};

export type Normalized = {
  byId: Record<string, User>;
  allIds: string[];
};

export type AuthField = null | { userId: LocalStorageFunc };

export type ActionError = { code: number; message: string };

export type ErrorFields = { code: number; message: string };
