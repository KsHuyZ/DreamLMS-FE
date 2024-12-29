import { useQuery } from '@tanstack/react-query';

import { findRelatedCourse } from '@/api';
import { QueryKey } from '@/constant';

export const useRelatedCourse = (id: string) =>
  useQuery({
    queryKey: [QueryKey.RelatedCourse, id],
    queryFn: () => findRelatedCourse(id),
  });
