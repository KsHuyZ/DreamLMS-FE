import { useQuery } from '@tanstack/react-query';

import { getStorage } from '@/api';
import { QueryKey } from '@/constant';

export const useStorage = (query: boolean) =>
  useQuery({
    queryKey: [QueryKey.Storage],
    queryFn: getStorage,
    enabled: query,
  });
