import { useMutation, useQuery } from '@tanstack/react-query';

import { getMe, updateSocial } from '@/api';
import { QueryKey } from '@/constant';
export const useMe = (isQuery = true) =>
  useQuery({ queryKey: [QueryKey.Me], queryFn: getMe, enabled: isQuery });

export const useSocial = () =>
  useMutation({
    mutationFn: updateSocial,
  });
