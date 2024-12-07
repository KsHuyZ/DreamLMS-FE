import api from '@/lib/api';

import { TEnroll } from '@/types';

export const getEnrollByCourseId = (id?: string): Promise<TEnroll> =>
  api.get(`/enrolls/${id}`);
