// auth.service
export type Auth = {
  email: string;
  name?: string;
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

// usersReducer
export type Initial = {
  entities:
    | null
    | {
        name: string;
        email: string;
        password: string;
        tasks: Tasks;
      }[];
  isLoading: boolean;
  error: null | string;
  auth: null | { userId: LocalStorageFunc };
  isLoggedIn: boolean;
};
