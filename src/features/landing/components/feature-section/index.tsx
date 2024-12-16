import Link from 'next/link';
import React from 'react';

import CourseCard from '@/components/course-card';
import { Button } from '@/components/ui/button';

import { ECourseStatus, ELevel, ERoles, TCourse } from '@/types';

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
} as unknown as TCourse;

const FeatureSection = () => {
  return (
    <section className='bg-[url(/images/banner.png)] w-full py-20'>
      <div className='px-5 xl:px-0 xl:container space-y-4'>
        <div className='flex flex-col justify-between items-start lg:items-center lg:flex-row space-y-6'>
          <div className='flex flex-col space-y-6'>
            <p className='font-bold text-xl text-primary-800'>What's New</p>
            <h1 className='text-tertiary-800'>Featured Courses</h1>
          </div>
          <Button
            className='text-tertiary-800 border border-tertiary-800 rounded-full'
            variant='outline'
          >
            <Link href='/courses'>All courses</Link>
          </Button>
        </div>
        <p className='text-tertiary-600 max-w-[700px] font-semibold'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
          accumsan bibendum gravida maecenas augue elementum et neque.
          Suspendisse imperdiet.
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <CourseCard course={mockCourse} />
          <CourseCard course={mockCourse} />
          <CourseCard course={mockCourse} />
          <CourseCard course={mockCourse} />
          <CourseCard course={mockCourse} />
          <CourseCard course={mockCourse} />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
