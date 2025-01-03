import { useQuery } from '@tanstack/react-query';

import { getTotalTransaction } from '@/api';
import { QueryKey } from '@/constant';

export const useTotalTransaction = () =>
  useQuery({
    queryKey: [QueryKey.TotalTransaction],
    queryFn: () => getTotalTransaction(),
  });
