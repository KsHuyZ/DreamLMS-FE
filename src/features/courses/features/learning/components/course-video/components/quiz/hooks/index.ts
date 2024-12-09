import { useQuery } from '@tanstack/react-query';

import {
  getQuestionsByQuizId,
  getQuestionsResult,
  getQuizStartTime,
} from '@/api';
import { QueryKey } from '@/constant';

export const useQuestion = (id?: string, isCompleted?: boolean) =>
  useQuery({
    queryKey: [QueryKey.Question, id, isCompleted],
    queryFn: () =>
      isCompleted ? getQuestionsResult(id) : getQuestionsByQuizId(id),
    enabled: !!id,
  });

export const useQuizStart = (id?: string) =>
  useQuery({
    queryKey: [QueryKey.QuizStart, id],
    queryFn: () => getQuizStartTime(id),
    enabled: !!id,
  });
