import { TQuiz, TVideo } from '@/types';

export type LessonCredentials = {
  id?: string;
  name: string;
  description?: string;
  courseId?: string;
  disabled?: boolean;
};

export type TLessonVideo = {
  id: string;
  title: string;
  description: string;
  video?: TVideo;
  disabled: boolean;
  lessonId: string;
  order?: number;
};

export type Lesson = {
  id: string;
  order: number;
  videos: TLessonVideo[];
  quizzes: TQuiz[];
} & LessonCredentials;
