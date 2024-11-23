import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { signUp } from '@/api';
import { validateError } from '@/utils';

import { ERoles, TSignUpCredentials } from '@/types';

export const useSignUp = (isStudent: boolean) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (values: TSignUpCredentials) =>
      signUp({ ...values, role: isStudent ? ERoles.STUDENT : ERoles.TEACHER }),
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
