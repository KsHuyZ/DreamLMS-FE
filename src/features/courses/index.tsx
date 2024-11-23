'use client';
import { ListFilter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

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

import { ECourseStatus, ELevel, ERoles } from '@/types';

const mockCourse = {
  id: 'string',
  name: 'Tailwind from zero to hero',
  price: 20000,
  videoPreview: 'https://example.com/path/to/file.mp4',
  description: 'this is description',
  shortDescription: 'this is short description',
  image: {
    id: '',
    name: '',
    url: '/images/spider.jpg',
    format: '',
    size: 10,
    publicId: '',
  },
  duration: 2000,
  createdBy: {
    id: 'strng',
    firstName: 'Samantha',
    email: 'hahahahahaha@gmail.com',
    lastName: 'Woolfie',
    role: ERoles.TEACHER,
    photo: '/images/avatar.jpg',
  },
  tags: [],
  categories: [],
  lessons: 1,
  level: ELevel.BEGINNER,
  isDeleted: true,
  willLearn: ['Become master css', 'Become master React', "I don't know"],
  createdAt: '2024-08-31T08:06:49.029Z',
  updatedAt: '2024-08-31T08:06:49.029Z',
  status: ECourseStatus.Draft,
};

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(true);
  return (
    <section className='px-5 xl:px-0 xl:container mt-32'>
      <div className='space-y-5'>
        <h1 className='max-w-[800px]'>
          10.000 results for “{searchParams.get('name')}”
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
            <Select defaultValue='newest'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value='newest'>Newest</SelectItem>
                  <SelectItem value='most-reviewed'>Most Reviewed</SelectItem>
                  <SelectItem value='high-rated'>High Rated</SelectItem>
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
            <CoursesFilter />
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
                <CourseCardRow course={mockCourse} />
                <CourseCardRow course={mockCourse} />
                <CourseCardRow course={mockCourse} />
                <CourseCardRow course={mockCourse} />
                <CourseCardRow course={mockCourse} />
              </div>
              <Paginations
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onPageChange={(page) => {}}
                currentPage={1}
                totalCount={20}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
