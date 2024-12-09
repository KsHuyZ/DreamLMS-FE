import { useQuery } from '@tanstack/react-query';

import { getMyCourse, getUserCart } from '@/api';

export const useMyCourse = () =>
  useQuery({ queryKey: ['my-course'], queryFn: getMyCourse });

export const useUserCart = () =>
  useQuery({ queryKey: ['user-cart'], queryFn: getUserCart });
