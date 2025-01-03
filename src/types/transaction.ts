import { TCourse } from '@/types/course';
import { TUser } from '@/types/user';

export enum AmountUnit {
  Dollar,
  ETH,
}

export type Transaction = {
  amount: number;
  course: TCourse;
  id: string;
  user: TUser;
  amountUnit: AmountUnit;
  createdAt: string;
};
