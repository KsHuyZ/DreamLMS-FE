export type TAnswerPayload = {
  title: string;
  isCorrect: boolean;
};

export type TAnswer = {
  id: string;
} & TAnswerPayload;

export type TQuestion = {
  id?: string;
  title: string;
  type: EQuizType;
  description: string;
  answers: TAnswerPayload[];
};

export type TQuestionResponse = TQuestion & {
  choiceResponses: TAnswer[];
};

export type TQuestionCredential = TQuestion;

export type TQuestionResults = {
  questionId: string;
  answerResults: {
    answerId: string;
  }[];
};

export type TQuizSubmitResults = {
  quizId: string;
  questionResultRequestList: TQuestionResults[];
};

export type TQuizCredentials = {
  title: string;
  description: string;
  lessonId: string;
  questions?: TQuestion[];
  time?: number;
};
export type TQuiz = {
  id: string;
  order?: number;
  disabled: boolean;
} & TQuizCredentials;

export enum EQuizType {
  SingleChoice = 'SingleChoice',
  MultipleChoice = 'MultipleChoice',
  Essay = 'Essay',
}
