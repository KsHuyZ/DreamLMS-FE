import { useQuery } from '@tanstack/react-query';

import { getMyCourse } from '@/api';
import { QueryKey } from '@/constant';

export const useUserCourse = () =>
  useQuery({ queryKey: [QueryKey.UserCourse], queryFn: getMyCourse });
