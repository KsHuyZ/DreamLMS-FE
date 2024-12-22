import api from '@/lib/api';

import { TCourseProgress, TEnroll } from '@/types';

export const getEnrollByCourseId = (id?: string): Promise<TEnroll> =>
  api.get(`/enrolls/${id}`);

export const getMyCourse = async (): Promise<TCourseProgress[]> =>
  api.get('/enrolls/me');
