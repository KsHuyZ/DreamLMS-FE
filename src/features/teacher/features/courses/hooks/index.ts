import { useMutation, useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import {
  createLesson,
  getCategoriesByName,
  getLessonsByCourseId,
  getTagsByName,
  getTeacherCourses,
  updateLesson,
} from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';

import { LessonPayload } from '@/types';

export const useLessons = (id?: string) =>
  useQuery({
    queryKey: [QueryKey.Lessons, id],
    queryFn: () => getLessonsByCourseId(id ?? ''),
    enabled: !!id,
  });

export const useModificationLesson = (id?: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: LessonPayload) =>
      id ? updateLesson(data) : createLesson(data),
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};

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
