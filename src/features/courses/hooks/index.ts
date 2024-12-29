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
  duration: ECourseDuration[],
  payType: EPayType[],
  level: ELevel,
  page: number,
  name: string,
  rate?: ECourseRate
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
    queryFn: () => getCourses(sort, duration, payType, level, rate, page, name),
  });
