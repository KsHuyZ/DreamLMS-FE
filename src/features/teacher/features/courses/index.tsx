'use client';
import { Plus, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import CourseCard from '@/components/course-card';
import Input from '@/components/inputs/Input';
import Spinner from '@/components/loading/spinner';
import Paginations from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TeacherPath } from '@/constant';
import { useTeacherCourse } from '@/features/teacher/features/courses/hooks';

const initialPagination = {
  page: 1,
  limit: 10,
};

const TeacherCourses = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [pagination, setPagination] = useState(initialPagination);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      );
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const { data: coursesPaginate, isLoading } = useTeacherCourse();

  const courses = useMemo(
    () => coursesPaginate?.data ?? [],
    [coursesPaginate?.data]
  );
  const total = useMemo(
    () => coursesPaginate?.total ?? 1,
    [coursesPaginate?.total]
  );
  const onChangePage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div className='p-6 space-y-5'>
      <div className='grid grid-cols-2 gap-2'>
        <Link href='/teacher/courses/create/info'>
          <Button leftIcon={Plus}>New course</Button>
        </Link>
        <div className='flex items-center space-x-2'>
          <Input
            leftIcon={Search}
            placeholder='Eg: Become fullstack developer'
            value={searchParams.get('name') ?? ''}
            onChange={(e) => createQueryString('name', e.target.value)}
            className='rounded-md'
          />
          <Select
            value={searchParams.get('type') ?? ''}
            onValueChange={(value) => createQueryString('type', value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select course type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='publish'>Publish</SelectItem>
                <SelectItem value='draft'>Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex flex-col space-y-4'>
        <Label className='text-lg'>My courses</Label>
        {courses.length === 0 && !isLoading && (
          <div className='h-[50vh] w-full flex justify-center items-center'>
            <div className='flex flex-col space-y-4 items-center'>
              <Image
                src='/images/empty.svg'
                width={150}
                height={150}
                alt='Empty image'
              />
              <Label>You don't have any course</Label>
              <Link href='/teacher/courses/create/info'>
                <Button>Create now</Button>
              </Link>
            </div>
          </div>
        )}
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
          {courses.map((course) => (
            <Link
              key={course.id}
              href={TeacherPath.UpdateInfoCourse(course.id)}
            >
              <CourseCard isTeacherView course={course} />
            </Link>
          ))}
        </div>
        <Paginations
          onPageChange={onChangePage}
          currentPage={pagination.page}
          totalCount={total}
          pageSize={pagination.limit}
        />
      </div>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
