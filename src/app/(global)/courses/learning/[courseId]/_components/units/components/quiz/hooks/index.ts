import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { submitQuiz } from '@/api';
import { validateError } from '@/utils';

import { TQuestionResults } from '@/types';

export const useSubmitQuiz = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: {
      quizId: string;
      questionResultRequestList: TQuestionResults[];
    }) => submitQuiz(values),
    onSuccess() {
      toast({ variant: 'success', title: 'Submit quiz success' });
    },
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
