import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createLesson,
  getCategoriesByName,
  getLessonByCourseId,
  getTagsByName,
  getTeacherCourses,
  updateLesson,
} from '@/api';
import { QueryKey } from '@/constant';

import { LessonCredentials } from '@/types';

export const useLessons = (id?: string) =>
  useQuery({
    queryKey: [QueryKey.Lessons],
    queryFn: () => getLessonByCourseId(id ?? ''),
    enabled: !!id,
  });

export const useModificationLesson = (id?: string) =>
  useMutation({
    mutationKey: ['modificationLesson'],
    mutationFn: (data: LessonCredentials) =>
      id ? updateLesson(data) : createLesson(data),
  });

export const useTeacherCourse = (name?: string, status?: string) =>
  useQuery({
    queryKey: [QueryKey.TeacherCourse],
    queryFn: () => getTeacherCourses({ name, status }),
  });

export const useTags = (title: string) =>
  useQuery({
    queryKey: [QueryKey.Tag, title],
    queryFn: () => getTagsByName(title),
    enabled: !!title,
  });

export const useCategory = (title: string) =>
  useQuery({
    queryKey: [QueryKey.Category, title],
    queryFn: () => getCategoriesByName(title),
    enabled: !!title,
  });
