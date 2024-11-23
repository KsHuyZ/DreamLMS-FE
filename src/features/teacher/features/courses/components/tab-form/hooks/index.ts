import { useMutation, useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import {
  addAdditionData,
  createCourses,
  getCourseById,
  updateCourses,
} from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';

import { CourseCredentials, TAdditionCoursePayload } from '@/types';

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

export const useAddCourseAddition = (id: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (payload: TAdditionCoursePayload) =>
      addAdditionData(id, payload),
    onSuccess() {
      toast({ title: 'Update course success', variant: 'success' });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
