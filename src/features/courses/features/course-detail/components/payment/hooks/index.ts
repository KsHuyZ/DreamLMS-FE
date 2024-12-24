import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { enrollContract, payCourse } from '@/api';
import { validateError } from '@/utils';

export const usePayCourse = (courseId: string) =>
  useMutation({
    mutationFn: () => payCourse(courseId),
    onError(error) {
      console.log({ error });
    },
  });

export const useEnrollContract = (courseId: string) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: () => enrollContract(courseId),
    onSuccess() {
      toast({ variant: 'success', title: 'Enroll success!' });
    },
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
