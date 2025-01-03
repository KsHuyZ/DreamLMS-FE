import { useQueries } from '@tanstack/react-query';

import { getTotalTransaction, getTransactions } from '@/api';
import { QueryKey } from '@/constant';

export const useTransaction = () =>
  useQueries({
    queries: [
      {
        queryKey: [QueryKey.Transaction],
        queryFn: () => getTransactions(),
      },
      {
        queryKey: [QueryKey.TotalTransaction],
        queryFn: () => getTotalTransaction(),
      },
    ],
  });
