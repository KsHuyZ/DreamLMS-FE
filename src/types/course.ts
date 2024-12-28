import { CreateCourseForm } from '@/validator';

import {
  ELevel,
  ICategory,
  ITag,
  TImage,
  TLessonVideo,
  TQuiz,
  TUser,
  TVideo,
} from '@/types';

export type CourseCredentials = {
  id?: string;
} & CreateCourseForm;

export type TCourseVideo = {
  id: string;
  video: TVideo;
};

export type TCourse = {
  id: string;
  image: TImage;
  name: string;
  video?: TVideo;
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
  courseVideo?: TCourseVideo;
  related?: TCourse[];
  ethPrice?: string;
};

export type TCourseProgress = {
  progress: number;
  haveCertificate?: boolean;
} & TCourse;

export type TCourseQuery = Omit<TCourse, 'lessons'> & {
  lessons: number;
  duration: number;
  star: number;
  isEnrolled: boolean;
  alreadyCart: boolean;
};
export interface CourseAdditionForm {
  related: TCourse[];
  video: File;
}

export enum EUnitType {
  VIDEO = 'video',
  QUIZ = 'quiz',
}

export enum ECoursePriceType {
  USD = 'usd',
  ETHEREUM = 'ethereum',
}

export enum ECourseSort {
  Newest = 'createdAt',
  MostReviewed = 'totalReviewed',
  HighRated = 'avgStar',
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
  isCompleted?: boolean;
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
