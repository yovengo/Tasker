import { ReactNode } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';

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

export type AuthField = { userId: string } | null;

export type ErrorFields = { code: number; message: string };

// HOC
export type AppLoaderProps = {
  children: ReactNode;
};

export type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo: string;
};

export type WrapperComponentProps = {
  children: ReactNode;
};

export type NavBarLogoProps = {
  link: string;
  label: string;
};

export type StyleType = 'default' | 'button' | 'underline' | 'withIcon';

export type StyledNavLinkProps = {
  children: string;
  styleType?: StyleType;
  className?: string;
  to: string;
  [key: string]: any;
};

export type ThemeName = 'light' | 'dark' | null;

export type CardProps = {
  children: ReactNode;
};

export type CardTitleProps = {
  children: ReactNode;
  label?: string;
};

export type TextFieldProps = {
  type?: string;
  name: string;
  label: string;
  field: FieldValues;
  error?: FieldError;
  Icon?: any;
};

export type SignUpFields = {
  email: string;
  name: string;
  password: string;
};

export type ButtonProps = {
  label?: string;
  children: ReactNode;
};
