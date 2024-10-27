import { CreateCourseForm } from '@/validator';

import { ELevel, ICategory, ITag, TImage, TQuiz, TUser } from '@/types';

export type CourseCredentials = {
  id?: string;
} & CreateCourseForm;

export type TCourse = {
  id: string;
  image: TImage;
  name: string;
  videoPreview?: string;
  description: string;
  shortDescription: string;
  createdBy: TUser;
  level: ELevel;
  status: ECourseStatus;
  tags: ITag[];
  categories: ICategory[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  rate?: number;
  lessons: number;
  deletedAt?: string;
  price: number;
  duration: number;
};

export type TVideo = {
  id: string;
  title: string;
  content: string;
  url: string;
  idUnit: boolean;
  description: string;
};

export type LessonCredentials = {
  id?: string;
  title: string;
  content?: string;
  idCourse?: string;
};

export enum EUnitType {
  VIDEO = 'video',
  QUIZ = 'quiz',
}

export type TUnit = {
  id: string;
  idLesson: string;
  title: string;
  ordinalNumber: number;
  type: EUnitType;
  video?: TVideo;
  quizResponse?: TQuiz;
};

export type Lesson = {
  id: string;
  ordinalNumber?: number;
  isPublish?: boolean;
  units: TUnit[];
} & LessonCredentials;

export type TVideoCredentials = {
  title: string;
  file?: File;
  idLesson: string;
  description: string;
};

export enum ECourseStatus {
  Publish = 'publish',
  Draft = 'draft',
}
