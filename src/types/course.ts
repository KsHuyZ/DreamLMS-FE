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

export type TCourseQuery = Omit<TCourse, 'lessons'> & {
  lessons: number;
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

export enum ECourseSort {
  Newest = 'newest',
  MostReviewed = 'most-reviewed',
  HighRated = 'high-rated',
}

export enum EPayType {
  Free = 'Free',
  Paid = 'Paid',
}

export enum ECourseDuration {
  LessThanOneHour,
  OneToThreeHours,
  ThreeToSixHours,
  SixToSevenTeenHours,
  MoreThanSevenTeenHours,
}

export enum ECourseRate {
  OneStar = '1',
  TwoStar = '2',
  ThreeStar = '3',
  FourStar = '4',
}

export type TCourseFilter = {
  rate: ECourseRate;
  duration: ECourseDuration[];
  payment: EPayType[];
  level: ELevel;
};

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
