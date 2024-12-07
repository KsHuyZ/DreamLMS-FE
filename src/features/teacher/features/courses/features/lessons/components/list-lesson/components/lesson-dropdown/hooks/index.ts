import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { deleteQuiz, deleteVideo } from '@/api';
import { validateError } from '@/utils';

import { EUnitType } from '@/types';

export const useDeleteUnit = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id, unit }: { id: string; unit: EUnitType }) =>
      unit === EUnitType.QUIZ ? deleteQuiz(id) : deleteVideo(id),
    onError: (error) => {
      toast({ title: validateError(error), variant: 'destructive' });
    },
    onSuccess: () => {
      toast({ title: 'Delete success', variant: 'success' });
    },
  });
};
