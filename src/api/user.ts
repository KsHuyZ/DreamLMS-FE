import api from '@/lib/api';

import { TSocialPayload, TUser } from '@/types';

export const getMe = (): Promise<TUser> => api.get('/users/me');

export const updateSocial = (payload: TSocialPayload) =>
  api.patch(`/users`, payload);
