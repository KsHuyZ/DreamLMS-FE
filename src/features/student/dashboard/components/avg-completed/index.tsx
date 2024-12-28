'use client';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useUserCourse } from '@/features/student/courses/hooks';

const AvgCompleted = () => {
  const { data: courses, isLoading } = useUserCourse();
  return (
    <Card className='col-span-2'>
      <CardContent>
        <CardTitle>Course Progress</CardTitle>
        <div className='flex flex-col space-y-3 mt-10'>
          {courses?.map((course) => (
            <div
              className='grid grid-cols-8 gap-3 items-center space-x-2'
              key={course.id}
            >
              <Image
                width={100}
                height={100}
                className='rounded-md col-span-3'
                src={course.image.url}
                alt={course.image.url}
              />
              <Progress
                value={course.progress}
                className='rounded-md col-span-5'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvgCompleted;
