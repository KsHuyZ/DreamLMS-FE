import { useMutation, useQuery } from '@tanstack/react-query';

import { createCourses, getCourseById, updateCourses } from '@/api';
import { QueryKey } from '@/constant';

import { CourseCredentials } from '@/types';

export const useModificationCourse = (id?: string) =>
  useMutation({
    mutationFn: (course: CourseCredentials) =>
      id ? updateCourses(course) : createCourses(course),
  });

export const useCourseInfo = (id?: string, isQuery?: boolean) =>
  useQuery({
    queryKey: [QueryKey.CourseInfo, id],
    queryFn: () => getCourseById(id),
    enabled: isQuery && !!id,
  });
