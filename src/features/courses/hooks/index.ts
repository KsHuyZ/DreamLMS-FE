import { useQuery } from '@tanstack/react-query';

import { getCourses } from '@/api';
import { QueryKey } from '@/constant';

import {
  ECourseDuration,
  ECourseRate,
  ECourseSort,
  ELevel,
  EPayType,
} from '@/types';

export const useGuestCourses = (
  sort: ECourseSort,
  rate: ECourseRate,
  duration: ECourseDuration[],
  payType: EPayType[],
  level: ELevel,
  page: number,
  name: string
) =>
  useQuery({
    queryKey: [
      QueryKey.GuestCourse,
      sort,
      rate,
      duration,
      payType,
      level,
      page,
      name,
    ],
    queryFn: () => getCourses(sort, rate, duration, payType, level, page, name),
  });
