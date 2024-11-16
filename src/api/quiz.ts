import api from '@/lib/api';

import { TQuestionResponse, TQuestionResults, TQuizCredentials } from '@/types';

export const createQuiz = (quiz: TQuizCredentials) =>
  api.post('/quizzes', quiz);

export const getQuizByUnitId = (id?: string) =>
  api.get(`/quiz/getListQuizByIdUnit?id=${id}`);

export const getQuestionByQuizId = (
  id?: string
): Promise<TQuestionResponse[]> => api.get(`/question/get-by-quiz-id?id=${id}`);

export const submitQuiz = (values: {
  quizId: string;
  questionResultRequestList: TQuestionResults[];
}): Promise<{ score: string; isFinal: boolean; isPass: boolean }> =>
  api.post('/quiz-results/submit', values);
