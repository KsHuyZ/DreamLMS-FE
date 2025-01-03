'use client';
import {
  ArrowLeftRight,
  Award,
  Cloud,
  GraduationCap,
  Layout,
  LayoutDashboard,
  LucideIcon,
  ShoppingCart,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Progress } from '@/components/ui/progress';

import { useAuth } from '@/store/user.store';

import SidebarItem from '@/app/(global)/components/sidebar/components/sidebar-item';
import { useStorage } from '@/app/(global)/components/sidebar/hooks';
import { Path } from '@/constant';
import { convertByteToGB, formatBytes, getTotalStorage } from '@/utils';

import { TUser } from '@/types';

interface GuestRoutes {
  icon: LucideIcon;
  label: string;
  href: string;
}

const teacherRoutes: GuestRoutes[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/teacher/dashboard',
  },
  {
    icon: GraduationCap,
    label: 'Courses',
    href: '/teacher/courses',
  },
];

interface ISidebarProps {
  user?: TUser;
}

export const SidebarRoutes = ({ user }: ISidebarProps) => {
  const guestRoutes: GuestRoutes[] = [
    ...(user
      ? [
          {
            icon: Layout,
            label: 'Dashboard',
            href: '/dashboard',
          },
          {
            icon: User,
            label: `Profile`,
            href: `/profile/${user.id}`,
          },

          {
            icon: ShoppingCart,
            label: 'Cart',
            href: '/cart',
          },
        ]
      : []),
    {
      icon: GraduationCap,
      label: 'Courses',
      href: '/student-courses',
    },
    {
      icon: Award,
      label: 'Certificate',
      href: '/certificate',
    },
    {
      icon: ArrowLeftRight,
      label: 'Transaction',
      href: '/transaction',
    },
  ];
  const { user: me } = useAuth();
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  const { data } = useStorage(isTeacherPage);

  const totalStorage = useMemo(
    () => getTotalStorage(me?.totalStorage, me?.unit),
    [me]
  );

  const percentage = useMemo(() => {
    return (convertByteToGB(data) / totalStorage) * 100;
  }, [data, totalStorage]);

  return (
    <div className='flex flex-col w-full space-y-1'>
      {routes.map(({ href, icon, label }) => (
        <SidebarItem key={href} href={href} icon={icon} label={label} />
      ))}
      {isTeacherPage && (
        <>
          <SidebarItem
            href={Path.Storage}
            icon={Cloud}
            label={`Storage (Usage ${percentage.toFixed(2)}%)`}
          />
          <div className='m-2 space-y-2'>
            <Progress value={percentage} className='h-2' />
            <div className='flex justify-center'>
              <span className='text-center text-sm text-muted-foreground'>
                Usage {formatBytes(data || 0)} in total{' '}
                {getTotalStorage(me?.totalStorage, me?.unit)}GB
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
