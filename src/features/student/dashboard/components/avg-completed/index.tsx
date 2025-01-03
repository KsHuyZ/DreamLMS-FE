'use client';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { useUserCourse } from '@/features/student/courses/hooks';
import { useTotalTransaction } from '@/features/student/dashboard/components/avg-completed/hook';

const AvgCompleted = () => {
  const { data: courses, isLoading } = useUserCourse();
  const { data, isLoading: isPending } = useTotalTransaction();
  return (
    <div className='col-span-2 flex flex-col space-y-2'>
      <Card>
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
      <Card>
        <CardContent>
          <CardTitle>Total</CardTitle>
          <div className='flex flex-col space-y-2 mt-6'>
            <p>
              ETH: {isPending ? <Skeleton className='w-10 h-4' /> : data?.eth}
            </p>
            <p>
              Dollar:{' '}
              {isPending ? <Skeleton className='w-10 h-4' /> : data?.dollar}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvgCompleted;
