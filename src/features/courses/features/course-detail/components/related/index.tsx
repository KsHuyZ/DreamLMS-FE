'use client';
import React from 'react';

import CourseCard from '@/components/course-card';

import { useRelatedCourse } from '@/features/courses/features/course-detail/components/related/hooks';

interface Props {
  courseId: string;
}

const Related: React.FC<Props> = ({ courseId }) => {
  const { data, isLoading } = useRelatedCourse(courseId);
  return (
    <div className='flex flex-col space-y-8 px-5 xl:px-0 xl:container pt-5'>
      <h3>Course Related</h3>
      <div className='grid grid-cols-4 gap-4'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CourseCard loading key={index} />
            ))
          : data?.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
      </div>
    </div>
  );
};

export default Related;
