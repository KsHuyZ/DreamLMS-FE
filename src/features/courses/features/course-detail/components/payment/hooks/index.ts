import { useMutation } from '@tanstack/react-query';

import { payCourse } from '@/api';

export const usePayCourse = (courseId: string) =>
  useMutation({
    mutationFn: () => payCourse(courseId),
    onError(error) {
      console.log({ error });
    },
  });
