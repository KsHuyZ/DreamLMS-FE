import { useQuery } from '@tanstack/react-query';

import {
  getAllCourseCategories,
  getCourses,
  getLessonsByCourseId,
} from '@/api';

export const useCourse = (
  sortBy: string | null,
  priceMin: string | null,
  priceMax: string | null,
  keyword: string | null
) =>
  useQuery({
    queryKey: ['teacher-course', sortBy, priceMin, priceMax, priceMax, keyword],
    queryFn: () =>
      getCourses(sortBy, Number(priceMin), Number(priceMax), keyword),
  });

export const useCategory = () =>
  useQuery({ queryKey: ['category'], queryFn: getAllCourseCategories });

export const useLessonList = (id: string) =>
  useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLessonsByCourseId(id),
  });
