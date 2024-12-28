import { useQuery } from '@tanstack/react-query';

import { getDurationCoursePrice } from '@/api';
import { QueryKey } from '@/constant';

import { Duration } from '@/types';

export const useDurationPaid = (duration = Duration.Week) =>
  useQuery({
    queryFn: () => getDurationCoursePrice(duration),
    queryKey: [QueryKey.PaidDuration, duration],
  });
