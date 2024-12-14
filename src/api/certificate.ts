import api from '@/lib/api';

export const createCertificate = (courseId: string) =>
  api.post(`/certificate/${courseId}`);
