import { useQuery } from '@tanstack/react-query';

import { getAllCourseCategories, getLessonsByCourseId } from '@/api';

export const useCategory = () =>
  useQuery({ queryKey: ['category'], queryFn: getAllCourseCategories });

export const useLessonList = (id: string) =>
  useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLessonsByCourseId(id),
  });
