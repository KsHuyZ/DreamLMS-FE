import { ERoles } from '@/types';

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ERoles;
  photo?: string;
};

export type TSignInCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type TForgetPasswordCredentials = {
  email: string;
};
export type TSignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
