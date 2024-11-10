import { TQuiz, TVideo } from '@/types';

export type LessonCredentials = {
  id?: string;
  name: string;
  description?: string;
  courseId?: string;
  disabled?: boolean;
};
export type Lesson = {
  id: string;
  order: number;
  videos: TVideo[];
  quizzes: TQuiz[];
} & LessonCredentials;
