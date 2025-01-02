import { useQuery } from '@tanstack/react-query';

import { findCoursePreview } from '@/api';
import { QueryKey } from '@/constant';

export const useGetPreviewCourse = (name: string) =>
  useQuery({
    queryKey: [QueryKey.CoursePreview, name],
    queryFn: () => findCoursePreview(name),
  });
