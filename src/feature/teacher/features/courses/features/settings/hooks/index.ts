import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import { removeCourse } from '@/api';
import { QueryKey, TeacherPath } from '@/constant';
import { validateError } from '@/utils';

export const useRemoveCourse = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: () => removeCourse(id),
    onSuccess: () => {
      toast({ variant: 'success', title: 'Delete course success!' });
      queryClient.invalidateQueries({ queryKey: [QueryKey.TeacherCourse] });
      router.replace(TeacherPath.Courses);
    },
    onError: (error) => {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
