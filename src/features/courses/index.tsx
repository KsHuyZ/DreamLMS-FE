'use client';
import { ListFilter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import CourseCardRow from '@/components/course-card-row';
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

import CoursesFilter from '@/features/courses/components/courses-filter';

import {
  ECourseDuration,
  ECourseRate,
  ECourseSort,
  ELevel,
  EPayType,
  TCourseFilter,
} from '@/types';
import { useGuestCourses } from '@/features/courses/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const defaultValues: TCourseFilter = {
  rate: ECourseRate.OneStar,
  duration: [] as ECourseDuration[],
  payment: [] as EPayType[],
  level: ELevel.ALL,
};

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(true);
  const [sortBy, setSortBy] = useState(ECourseSort.Newest);
  const form = useForm({ defaultValues });
  const { duration, level, payment, rate } = form.watch();

  const [pagination, setPagination] = useState({ page: 1 });
  const { data: coursePaginate, isLoading } = useGuestCourses(
    sortBy,
    rate,
    duration,
    payment,
    level,
    pagination.page,
    searchParams.get('name') ?? ''
  );

  return (
    <section className='mt-32 px-5 xl:px-0 xl:container'>
      <div className='space-y-5'>
        <h1 className='max-w-[800px] flex items-center'>
          {isLoading ? (
            <Skeleton className='w-40 h-8 mx-4' />
          ) : (
            coursePaginate?.total ?? 0
          )}{' '}
          results for “
          <span className='text-tertiary-800'>{searchParams.get('name')}</span>”
        </h1>
        <div className='flex items-end space-x-4'>
          <Button
            className='rounded-md p-2'
            variant={showFilter ? 'default' : 'outline'}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <ListFilter
              className={cn(showFilter ? 'text-white' : 'text-primary-600')}
            />
          </Button>
          <div className='flex flex-col space-y-2'>
            <Label>Sort by</Label>
            <Select
              value={sortBy}
              onValueChange={(value: ECourseSort) => setSortBy(value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value={ECourseSort.Newest}>Newest</SelectItem>
                  <SelectItem value={ECourseSort.MostReviewed}>
                    Most Reviewed
                  </SelectItem>
                  <SelectItem value={ECourseSort.HighRated}>
                    High Rated
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-5 gap-2'>
          <div
            className={cn(
              'hidden lg:block space-y-8 transition-transform duration-500 ease-in-out col-span-1',
              showFilter ? 'translate-x-0' : '-translate-x-full lg:hidden'
            )}
          >
            <CoursesFilter form={form} />
          </div>
          <div
            className={cn(
              'duration-500',
              showFilter ? 'col-span-4' : 'col-span-5'
            )}
          >
            <div className='space-y-8'>
              <div
                className={cn(
                  'space-y-4 duration-500',
                  showFilter ? 'translate-x-0' : ''
                )}
              >
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <CourseCardRow loading={isLoading} key={index} />
                  ))
                ) : !coursePaginate ||
                  !coursePaginate.data ||
                  !coursePaginate.data.length ? (
                  <div className='h-[calc(100vh-300px)] w-full flex justify-center items-center'>
                    <div className='flex flex-col space-y-4 items-center'>
                      <Image
                        src='/images/empty.svg'
                        width={150}
                        height={150}
                        alt='empty'
                      />
                      <Label>No result found</Label>
                    </div>
                  </div>
                ) : (
                  coursePaginate?.data.map((course) => {
                    return <CourseCardRow course={course} key={course.id} />;
                  })
                )}
              </div>
              {!isLoading && Number(coursePaginate?.data.length) > 0 && (
                <Paginations
                  onPageChange={(page) =>
                    setPagination((prev) => ({ ...prev, page: page + 1 }))
                  }
                  currentPage={pagination.page}
                  totalCount={coursePaginate?.total ?? 0}
                  pageSize={40}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
