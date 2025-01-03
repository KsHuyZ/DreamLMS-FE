import api from '@/lib/api';

import { Transaction, TSocialPayload, TUser } from '@/types';

export const getMe = (): Promise<TUser> => api.get('/auth/me');

export const updateSocial = (payload: TSocialPayload) =>
  api.patch(`/users`, payload);

export const getTransactions = (): Promise<Transaction[]> =>
  api.get('/transactions');

export const getTotalTransaction = (): Promise<{
  eth: number;
  dollar: number;
}> => api.get('/transactions/total');

export const getTotalReceived = (): Promise<{
  eth: number;
  dollar: number;
}> => api.get('/transactions/received');

export const uploadAvatar = (photo: string): Promise<void> =>
  api.post('/users/photo', { photo });
