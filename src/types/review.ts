import { TCourse } from '@/types/course';
import { TUser } from '@/types/user';

export type TReviewPayload = {
  comment: string;
  star: number;
  courseId: string;
};

export type TReview = {
  id: string;
  createdAt: string;
  user: TUser;
  course: TCourse;
} & Omit<TReviewPayload, 'courseId'>;
