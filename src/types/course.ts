import { CreateCourseForm } from '@/validator';

import {
  ELevel,
  ICategory,
  ITag,
  TImage,
  TLessonVideo,
  TQuiz,
  TUser,
} from '@/types';

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

export interface CourseAdditionForm {
  related: TCourse[];
  video: File;
}

export enum EUnitType {
  VIDEO = 'video',
  QUIZ = 'quiz',
}

export type TUnit = {
  unit: EUnitType;
} & TLessonVideo &
  TQuiz;

export enum ECourseStatus {
  Publish = 'publish',
  Draft = 'draft',
}

export type TAdditionCoursePayload = {
  video: File;
  related: string[];
};
