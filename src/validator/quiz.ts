import { z } from 'zod';

import { EQuizType } from '@/types';

export const answerSchema = z.object({
  title: z.string({ required_error: 'Title question is required' }),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  title: z.string({ required_error: 'Title question is required' }),
  description: z.string(),
  type: z.enum([
    EQuizType.SingleChoice,
    EQuizType.MultipleChoice,
    EQuizType.Essay,
  ]),
  answers: z.array(answerSchema),
});

export const quizGroupSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
    })
    .trim(),
  description: z
    .string({
      required_error: 'Description is required!',
    })
    .trim(),
  time: z.date(),
  questions: z.array(questionSchema),
});
