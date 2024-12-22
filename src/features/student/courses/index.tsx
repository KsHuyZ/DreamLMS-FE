'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import CourseCard from '@/components/course-card';
import { Label } from '@/components/ui/label';

import { Path } from '@/constant';
import { useUserCourse } from '@/features/student/courses/hooks';

const StudentCourse = () => {
  const { data: courses, isLoading } = useUserCourse();

  return (
    <div className='flex flex-col space-y-4'>
      <Label className='text-lg'>My courses</Label>
      {!courses ||
        (courses.length === 0 && !isLoading && (
          <div className='h-[50vh] w-full flex justify-center items-center'>
            <div className='flex flex-col space-y-4 items-center'>
              <Image
                src='/images/empty.svg'
                width={150}
                height={150}
                alt='Empty image'
              />
              <Label>You don't have any course</Label>
            </div>
          </div>
        ))}
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {isLoading &&
          [1, 2, 3, 4, 5].map((item) => <CourseCard key={item} loading />)}
        {courses?.map((course) => (
          <Link key={course.id} href={Path.Learning(course.id)}>
            <CourseCard course={course} isStudentView />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentCourse;
