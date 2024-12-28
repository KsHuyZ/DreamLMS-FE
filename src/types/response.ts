import { Token } from '@/types/token';
import { TUser } from '@/types/user';

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expires: { token: number; refreshToken: number };
};
export type SignInResponse = {
  user: TUser;
  tokenExpires: number;
} & Token;

export type PaginationResponse<T> = {
  page: number;
  pages: number;
  size: number;
  total: number;
  data: T[];
};

export type Analyzing = {
  total: number;
  percentage: number;
};
