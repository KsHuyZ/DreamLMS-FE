import { useMutation } from '@tanstack/react-query';

import { buyAllCart } from '@/api';

export const useBuyCart = () => useMutation({ mutationFn: buyAllCart });
