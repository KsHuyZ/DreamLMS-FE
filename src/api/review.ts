import api from '@/lib/api';

import { PaginationResponse, TReview, TReviewPayload } from '@/types';

export const getReviewsByCourseId = (
  courseId: string,
  page = 1,
  limit = 4,
  stars = [1, 2, 3, 4, 5]
): Promise<
  PaginationResponse<TReview> & { avgRate: number; alreadyRated: boolean }
> =>
  api.get(
    `/rates/course-pagination/${courseId}?page=${page}&limit=${limit}&stars=${stars.join(
      ','
    )}`
  );

export const createReview = (payload: TReviewPayload) =>
  api.post('/rates', payload);
