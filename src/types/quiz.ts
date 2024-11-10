export type TChoice = {
  id?: string;
  content: string;
  correct: boolean;
};

export type TQuestion = {
  id?: string;
  content: string;
  description: string;
  level: number;
};

export type TQuestionResponse = TQuestion & {
  choiceResponses: TChoice[];
};

export type TQuestionCredential = TQuestion & {
  choices: TChoice[];
};

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
  order?: number;
  finalExam?: boolean;
  questions?: TQuestion[];
  time?: number;
};
export type TQuiz = {
  id: string;
} & TQuizCredentials;
