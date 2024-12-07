import { useQuery } from '@tanstack/react-query';

import { getAllCourseCategories } from '@/api';

export const useCategory = () =>
  useQuery({ queryKey: ['category'], queryFn: getAllCourseCategories });
