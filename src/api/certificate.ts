import api from '@/lib/api';

import { Certificate } from '@/types';

export const createCertificate = (courseId: string) =>
  api.post(`/certificate/${courseId}`);

export const getCertificateByUserIdAndCourseId = (
  courseId: string,
  userId: string
): Promise<Certificate> => api.get(`/certificate/${courseId}/${userId}`);
