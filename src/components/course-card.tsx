'use client';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { formatPrice, formatTimeToDuration } from '@/utils';

import { ECourseStatus, TCourse } from '@/types';

export interface CourseCardProps {
  course?: TCourse & { progress?: number; star?: number };
  loading?: boolean;
  isTeacherView?: boolean;
  isStudentView?: boolean;
}

const CourseCard = ({
  course,
  loading,
  isTeacherView,
  isStudentView,
}: CourseCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const rate = course?.rate ?? 0;
  return (
    <Card className='rounded-md overflow-hidden hover:shadow-md group duration-500 h-full cursor-pointer'>
      <div className='w-full aspect-video p-5'>
        {loading ? (
          <Skeleton className='w-full h-50' />
        ) : (
          <Image
            src={course?.image.url ?? ''}
            className='object-cover w-full h-50 rounded-md duration-150'
            alt={course?.name ?? ''}
            width={150}
            height={150}
          />
        )}
      </div>
      <CardContent className='flex-1'>
        <div className='flex flex-col space-y-5'>
          {!isStudentView && course?.status === ECourseStatus.Publish && (
            <div className='flex items-center space-x-2'>
              {Array.from({ length: rate }).map((_, index) => (
                <Star
                  key={index}
                  className='text-yellow-300 w-5 h-5'
                  fill='#fde047'
                />
              ))}
              {Array.from({ length: 5 - rate }).map((_, index) => (
                <Star key={index} className='text-yellow-300 w-5 h-5' />
              ))}
              <p className='text-tertiary-800 duration-150'>{rate} (0)</p>
            </div>
          )}
          {loading ? (
            <Skeleton className='w-44 h-4' />
          ) : (
            <p className='font-bold text-tertiary-800 text-xl duration-500 max-w-3xl'>
              {course?.name}
            </p>
          )}
          {isTeacherView && (
            <div>
              <Badge
                className={cn(
                  course?.status === ECourseStatus.Publish
                    ? 'bg-emerald-600'
                    : 'bg-yellow-300'
                )}
              >
                {course?.status === ECourseStatus.Publish ? 'Publish' : 'Draft'}
              </Badge>
            </div>
          )}
          <div className='flex justify-between items-center'>
            {!isTeacherView && (
              <div className='flex items-center space-x-4'>
                <Image
                  src={course?.createdBy.photo?.url ?? '/images/avatar.jpg'}
                  width={45}
                  height={45}
                  alt={course?.createdBy.photo?.url ?? ''}
                  className='rounded-full border-2 border-gray-400'
                />
                <div>
                  <p className='text-tertiary-800 font-bold text-md group-hover:duration-150'>
                    {course?.createdBy.firstName} {course?.createdBy.lastName}
                  </p>
                  <p className='text-tertiary-800 group-hover:duration-150'>
                    Instructor
                  </p>
                </div>
              </div>
            )}
            {isTeacherView || isStudentView ? (
              <></>
            ) : (
              <button onClick={() => setIsLiked((prev) => !prev)}>
                <Heart
                  className='text-primary-600'
                  fill={isLiked ? '#ff6575' : 'transparent'}
                />
              </button>
            )}
          </div>
          {isStudentView && (
            <div className='space-y-2'>
              <Progress value={course?.progress || 0} className='h-2' />
              <p className='text-muted-foreground text-sm text-right'>
                Completed{' '}
                {Number(course?.progress) > 100 ? 100 : course?.progress} %
              </p>
            </div>
          )}

          {!isStudentView && (
            <>
              <div className='space-y-3'>
                <div className='my-3 flex items-center justify-between text-sm md:text-xs'>
                  <div className='flex items-center gap-x-1 text-slate-500'>
                    <Image
                      src='/images/note-book.svg'
                      width={20}
                      height={20}
                      alt='note-book'
                    />
                    {loading ? (
                      <Skeleton className='w-24 h-4' />
                    ) : (
                      <span>{course?.lessons ?? 0} Lessons</span>
                    )}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-tertiary-800 duration-150'>
                      {formatTimeToDuration(course?.duration ?? 0)}
                    </span>
                    <Image
                      src='/images/clock.svg'
                      width={20}
                      height={20}
                      alt='clock'
                    />
                  </div>
                </div>
              </div>
              <Separator className='w-full' />
              <div className='flex items-center justify-between'>
                <p className='text-tertiary-800 font-bold text-xl'>
                  {formatPrice(course?.price)}
                </p>
                {!isTeacherView && <Button>Buy now</Button>}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
