import api from '@/lib/api';

import { TQuestionResult, TQuestionTest } from '@/types';

export const getQuestionsByQuizId = (id?: string): Promise<TQuestionTest[]> =>
  api.get(`/questions/quiz/${id}`);

export const getQuestionsResult = (id?: string): Promise<TQuestionResult[]> =>
  api.get(`/questions/result/${id}`);
