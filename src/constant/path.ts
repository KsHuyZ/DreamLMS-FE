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
};
