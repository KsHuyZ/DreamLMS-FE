import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { getUserCart, removeCartItem } from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';

export const useUserCart = () =>
  useQuery({ queryKey: [QueryKey.UserCart], queryFn: getUserCart });

export const useRemoveCartItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKey.UserCart] });
      toast({ title: 'Remove cart item success!', variant: 'success' });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
