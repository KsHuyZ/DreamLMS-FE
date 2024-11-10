import api from '@/lib/api';

import { Lesson, LessonCredentials } from '@/types';

export const getLessonsByCourseId = (courseId: string): Promise<Lesson[]> =>
  api.get(`/lessons/course/${courseId}`);

export const createLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.post('/lessons', lesson);

export const updateLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.put(`/lessons/${lesson.id}`, lesson);
