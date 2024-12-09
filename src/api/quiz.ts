import api from '@/lib/api';

import { TQuestionResults, TQuizCredentials } from '@/types';

export const createQuiz = (quiz: TQuizCredentials) =>
  api.post('/quizzes', quiz);

export const deleteQuiz = (quizId: string) => api.delete(`/quizzes/${quizId}`);

export const submitQuiz = (
  quizId: string,
  questionResultRequestList: TQuestionResults[]
): Promise<number> => api.post(`/quizzes/${quizId}`, questionResultRequestList);
