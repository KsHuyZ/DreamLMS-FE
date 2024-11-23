'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { TeacherPath } from '@/constant';

const tabsList = (id?: string) => {
  return [
    {
      label: 'Course Info',
      value: id
        ? TeacherPath.UpdateInfoCourse(id)
        : TeacherPath.CreateInfoCourse,
    },
    {
      label: 'Lesson',
      value: TeacherPath.UpdateLessonCourse(id),
    },
    {
      label: 'Addition',
      value: TeacherPath.UpdateAdditionCourse(id),
    },
    {
      label: 'Settings',
      value: TeacherPath.SettingCourse(id),
    },
  ];
};

const Tabs = () => {
  const { id } = useParams();
  const pathName = usePathname();
  return (
    <ul className='mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0'>
      {tabsList(id as string).map((tab) => (
        <li
          className={cn(
            'flex-auto text-center',
            tab.value !== TeacherPath.CreateInfoCourse && !id
              ? 'text-gray-300 opacity-30 cursor-default'
              : ' border-b-2 hover:bg-neutral-100 cursor-pointer',
            pathName === tab.value ? 'border-primary-600 text-primary-600' : ' '
          )}
          key={tab.value}
        >
          <Link
            href={
              tab.value !== TeacherPath.CreateInfoCourse && !id
                ? '#'
                : tab.value
            }
            className={cn(
              'my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 font-medium hover:isolate rounded-md hover:border-transparent '
            )}
          >
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
