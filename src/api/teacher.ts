import api from '@/lib/api';

import { Analyzing } from '@/types';

export const getTeacherAnalyzingEnroll = (): Promise<Analyzing> =>
  api.get('/enrolls/enroll-analyzing');

export const getTeacherAnalyzingActiveCourse = (): Promise<Analyzing> =>
  api.get('/courses/active-course');

export const getTeacherCompletedCourse = (): Promise<Analyzing> =>
  api.get('/enrolls/completed-analyzing');

export const getTeacherTotalCourse = (): Promise<Analyzing> =>
  api.get('/courses/total-course');
