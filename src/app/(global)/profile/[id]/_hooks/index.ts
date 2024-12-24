import { useMutation, useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { getMe, updateSocial } from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';
export const useMe = (isQuery = true) =>
  useQuery({ queryKey: [QueryKey.Me], queryFn: getMe, enabled: isQuery });

export const useSocial = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateSocial,
    onSuccess() {
      toast({ variant: 'success', title: 'Update social success' });
    },
    onError(error) {
      toast({ variant: 'destructive', title: validateError(error) });
    },
  });
};
