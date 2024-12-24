import api from '@/lib/api';

import { TCourseProgress, TEnroll } from '@/types';

export const getEnrollByCourseId = (id?: string): Promise<TEnroll> =>
  api.get(`/enrolls/${id}`);

export const getMyCourse = (): Promise<TCourseProgress[]> =>
  api.get('/enrolls/me');

export const enrollContract = (courseId: string): Promise<void> =>
  api.get(`/enrolls/enroll-contract/${courseId}`);
