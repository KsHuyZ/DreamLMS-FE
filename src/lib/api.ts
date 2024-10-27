import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { getCookies, setCookies } from '@/lib/action';

import { refreshToken as refreshTokenApi } from '@/api';

import { Token } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(onResponseSuccess, onResponseError);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = (await getCookies('token')) as Token;
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401) {
      const token = (await getCookies('token')) as Token | undefined;
      const refreshToken = token?.refreshToken;
      if (refreshToken) {
        const result = await refreshTokenApi(refreshToken);
        const { token, refreshToken: newRefreshToken } = result;
        setCookies('token', { token, refreshToken: newRefreshToken });
        originalRequest.headers = {
          Authorization: 'Bearer ' + result.token,
        };
        return api(originalRequest);
      }
    }
    return Promise.reject(error?.data?.errors);
  }
);

export default api;
