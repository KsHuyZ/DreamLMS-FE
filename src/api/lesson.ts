import api from '@/lib/api';

import { Lesson, LessonPayload, LessonProgress } from '@/types';

export const getLessonsByCourseId = (courseId: string): Promise<Lesson[]> =>
  api.get(`/lessons/course/${courseId}`);

export const getLessonByLearnCourseId = (
  courseId: string
): Promise<LessonProgress[]> => api.get(`/lessons/learn/${courseId}`);

export const createLesson = (lesson: LessonPayload): Promise<Lesson> =>
  api.post('/lessons', lesson);

export const updateLesson = (lesson: LessonPayload): Promise<Lesson> =>
  api.put(`/lessons/${lesson.id}`, {
    ...lesson,
    disabled:
      typeof lesson.disabled === 'boolean' ? lesson.disabled : undefined,
  });
