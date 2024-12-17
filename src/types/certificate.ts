import { TCourse } from '@/types/course';
import { TUser } from '@/types/user';

export type Certificate = {
  course: TCourse;
  user: TUser;
  timestamp: number;
};

export type UserCertificate = {
  course: TCourse;
  timestamp: number;
};
