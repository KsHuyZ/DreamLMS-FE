import { EQuizType, TQuestionCredential } from '@/types';

export const initialQuestions: TQuestionCredential[] = [
  {
    title: '',
    description: '',
    type: EQuizType.SingleChoice,
    answers: [
      {
        isCorrect: true,
        title: '',
      },
    ],
  },
];

export const initialQuiz = {
  title: '',
  description: '',
  questions: initialQuestions,
};
