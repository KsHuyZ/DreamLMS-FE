import { useQuery } from '@tanstack/react-query';

import { getAdditionCourse } from '@/api';
import { QueryKey } from '@/constant';

export const useCourseAddition = (ids: string[], name: string) =>
  useQuery({
    queryKey: [QueryKey.CourseAddition, ...ids, name],
    queryFn: () => getAdditionCourse(ids, name),
    enabled: !!name,
  });
