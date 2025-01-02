import React from 'react';

import CourseCard from '@/components/course-card';

import { TCourse } from '@/types';

interface Props {
  courses: TCourse[];
}

const FeatureSection = ({ courses }: Props) => {
  return (
    <section className='bg-[url(/images/banner.png)] w-full py-20'>
      <div className='px-5 xl:px-0 xl:container space-y-4'>
        <div className='flex flex-col justify-between items-start lg:items-center lg:flex-row space-y-6'>
          <div className='flex flex-col space-y-6'>
            <p className='font-bold text-xl text-primary-800'>What's New</p>
            <h1 className='text-tertiary-800'>Featured Courses</h1>
          </div>
        </div>
        <p className='text-tertiary-600 max-w-[700px] font-semibold'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
          accumsan bibendum gravida maecenas augue elementum et neque.
          Suspendisse imperdiet.
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
