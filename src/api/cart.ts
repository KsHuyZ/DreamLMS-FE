import { PaymentIntent } from '@stripe/stripe-js';

import api from '@/lib/api';

import { TCart } from '@/types';

export const getUserCart = (): Promise<TCart> => api.get('/carts');

export const removeCartItem = (id: string) => api.delete(`/cart-items/${id}`);

export const createCartItem = (courseId: string) =>
  api.post(`/cart-items`, {
    courseId,
  });

export const buyAllCart = (): Promise<PaymentIntent> =>
  api.post('/carts/payments');
