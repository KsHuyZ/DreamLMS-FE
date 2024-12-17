import { useQuery } from '@tanstack/react-query';

import { getUserCertificates } from '@/api';

export const useUserCertificate = () =>
  useQuery({ queryFn: getUserCertificates, queryKey: ['user-certificate'] });
