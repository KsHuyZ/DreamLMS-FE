import { PaymentIntent } from '@stripe/stripe-js';

import api from '@/lib/api';

import { EPlan } from '@/constant';

export const getStorage = (): Promise<number> => api.get('/storages');

export const upgradeStorage = (plan: EPlan): Promise<PaymentIntent> =>
  api.post('/storages', { plan });
