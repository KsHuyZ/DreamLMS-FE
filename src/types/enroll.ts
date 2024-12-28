import { TCourse } from '@/types/course';
import { TUser } from '@/types/user';

export type TEnroll = {
  course?: TCourse;
  user?: TUser;
};

export enum Duration {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}
