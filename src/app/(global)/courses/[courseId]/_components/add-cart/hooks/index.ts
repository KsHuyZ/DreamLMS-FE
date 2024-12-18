import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { createCartItem } from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => createCartItem(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKey.UserCart] });
      toast({ variant: 'success', title: 'Add to cart success!' });
    },
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
