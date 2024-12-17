import { EPayment } from '@/types';

export const Path = {
  HOME: '/',
  ABOUT: '/about',
  SIGNIN: '/sign-in',
  SIGNUP: 'sign-up',
  PaymentSuccess: (id?: string) => `/enroll/course/${id}`,
  Learning: (id?: string) => `/courses/learning/${id}`,
  NotFound: `not-found`,
  Certificate: (userId: string, courseId: string) =>
    `/certificate/${userId}/${courseId}`,
  Storage: '/teacher/storage',
  PayCourse: (courseId: string, clientSecret: string | null) =>
    `/enroll/payments/${courseId}?clientSecret=${clientSecret}`,
  UpgradePlan: (clientSecret: string | null) =>
    `/enroll/payments/plans?clientSecret=${clientSecret}&type=${EPayment.UpgradePlans}`,
  CourseDetail: (courseId: string) => `/courses/${courseId}`,
};
export const TeacherPath = {
  Dashboard: '/teacher/dashboard',
  Courses: '/teacher/courses',
  CreateInfoCourse: '/teacher/courses/create/info',
  UpdateInfoCourse: (id?: string) => `/teacher/courses/update/info/${id}`,
  UpdateLessonCourse: (id?: string) => `/teacher/courses/update/lesson/${id}`,
  UpdateAdditionCourse: (id?: string) =>
    `/teacher/courses/update/addition/${id}`,
  SettingCourse: (id?: string) => `/teacher/courses/update/settings/${id}`,
  CreateVideo: (courseId: string) =>
    `/teacher/courses/update/lesson/${courseId}/video`,
  Certificate: (courseId?: string) =>
    `/teacher/courses/update/certificate/${courseId}`,
};
