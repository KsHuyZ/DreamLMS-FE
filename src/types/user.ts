import { ERoles } from '@/types';

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ERoles;
  photo?: string;
  x?: string;
  facebook?: string;
  github?: string;
  instagram?: string;
  description?: string;
  walletAddress?: string;
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

export type TSocialPayload = {
  x?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  walletAddress?: string;
};
