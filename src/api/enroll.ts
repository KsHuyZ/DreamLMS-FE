import api from '@/lib/api';

import { Duration, TCourseProgress, TEnroll } from '@/types';

export const getEnrollByCourseId = (id?: string): Promise<TEnroll> =>
  api.get(`/enrolls/${id}`);

export const getMyCourse = (): Promise<TCourseProgress[]> =>
  api.get('/enrolls/me');

export const enrollContract = (courseId: string): Promise<void> =>
  api.get(`/enrolls/enroll-contract/${courseId}`);

export const getDurationCoursePrice = (
  duration = Duration.Week
): Promise<number[]> => api.get(`/enrolls/duration?duration=${duration}`);
