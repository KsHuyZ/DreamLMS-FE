import { TCourse, TUser } from '@/types';

export type TCart = {
  id: string;
  cartItems: TCartItem[];
  user: TUser;
};

export type TCartItem = {
  id: string;
  course: TCourse;
};

export type TCartBuyAll = {
  redirect_url: string;
};
