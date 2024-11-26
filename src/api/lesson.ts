import api from '@/lib/api';

import { Lesson, LessonPayload } from '@/types';

export const getLessonsByCourseId = (courseId: string): Promise<Lesson[]> =>
  api.get(`/lessons/course/${courseId}`);

export const createLesson = (lesson: LessonPayload): Promise<Lesson> =>
  api.post('/lessons', lesson);

export const updateLesson = (lesson: LessonPayload): Promise<Lesson> =>
  api.put(`/lessons/${lesson.id}`, lesson);
