import { useMutation, useQuery } from '@tanstack/react-query';

import { getMe, updateSocial } from '@/api';
import { QueryKey } from '@/constant';
export const useMe = () =>
  useQuery({ queryKey: [QueryKey.Me], queryFn: getMe });

export const useSocial = () => useMutation({
  mutationFn: updateSocial
})