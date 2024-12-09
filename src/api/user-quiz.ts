import api from '@/lib/api';

import { UserQuiz } from '@/types';

export const getQuizStartTime = (quizId?: string): Promise<UserQuiz> =>
  api.get(`/user-quizzes/${quizId}`);

export const startTest = (quizId?: string) =>
  api.post(`/user-quizzes/${quizId}`);
