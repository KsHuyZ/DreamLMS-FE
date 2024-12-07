import { useQuery } from '@tanstack/react-query';

import { getLessonsByCourseId } from '@/api';
import { QueryKey } from '@/constant';

export const useLessonList = (id: string) =>
  useQuery({
    queryKey: [QueryKey.CourseLessons, id],
    queryFn: () => getLessonsByCourseId(id),
  });
