import { TQuiz, TVideo } from '@/types';

export type LessonPayload = {
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

export type TLessonVideoProgress = {
  isCompleted?: boolean;
} & TLessonVideo;

export type Lesson = {
  id: string;
  order: number;
  videos: TLessonVideo[];
  quizzes: TQuiz[];
} & LessonPayload;

export type LessonProgress = Omit<Lesson, 'videos'> & {
  videos: TLessonVideoProgress[];
};
