import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CourseCardProps } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';

import { formatPrice, formatTime, levelCourseMap } from '@/utils';

import { ELevel } from '@/types';

const CourseCardRow = ({ course, loading }: CourseCardProps) => {
  return (
    <HoverCard openDelay={0.5} closeDelay={0.5}>
      <HoverCardTrigger asChild>
        <Link
          href={!loading ? `/courses/${course?.id}` : '#'}
          className='flex justify-between p-4 rounded-md border duration-500 hover:shadow-md'
        >
          <div className='flex items-center space-x-4'>
            {loading ? (
              <Skeleton className='w-56 h-36' />
            ) : (
              <Image
                src={course?.image.url ?? ''}
                alt='image'
                width={250}
                height={200}
                className='rounded-md'
              />
            )}

            <div className='flex flex-col justify-between h-full'>
              {loading ? (
                <Skeleton className='w-20 h-4' />
              ) : (
                <span className='font-bold text-lg'>{course?.name}</span>
              )}
              <div className='flex flex-col space-y-1'>
                {loading ? (
                  <>
                    <Skeleton className='w-56 h-4' />
                    <Skeleton className='w-56 h-4' />
                    <Skeleton className='w-56 h-4' />
                  </>
                ) : (
                  <span className='line-clamp-2'>
                    {course?.shortDescription}
                  </span>
                )}

                {loading ? (
                  <Skeleton className='w-48 h-2' />
                ) : (
                  <span className='text-muted-foreground text-sm'>
                    {course?.createdBy.firstName} {course?.createdBy.lastName}
                  </span>
                )}

                <div className='flex items-center space-x-1'>
                  {loading ? (
                    <Skeleton className='w-48 h-2' />
                  ) : (
                    <div className='flex items-center space-x-1'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className='text-yellow-300 w-4 h-4'
                          fill='#fde047'
                        />
                      ))}
                      <p className='text-tertiary-800 duration-150'>5 (200)</p>
                    </div>
                  )}
                </div>
                <div className='flex items-center space-x-1 text-muted-foreground text-sm'>
                  {loading ? (
                    <Skeleton className='w-40 h-2' />
                  ) : (
                    <span>{formatTime(course?.duration ?? 0)}</span>
                  )}
                  <span className='text-xs'>●</span>
                  {loading ? (
                    <Skeleton className='w-40 h-2' />
                  ) : (
                    <span>
                      {course?.lessons} lesson
                      {Number(course?.lessons) > 1 ? 's' : ''}
                    </span>
                  )}
                  <span className='text-xs'>●</span>
                  {loading ? (
                    <Skeleton className='w-40 h-2' />
                  ) : (
                    <span>
                      {levelCourseMap.get(course?.level ?? ELevel.ALL)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Skeleton className='w-40 h-4' />
          ) : (
            <p className='font-bold text-lg'>{formatPrice(course?.price)}</p>
          )}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='w-96'>
        <div className='space-y-4 w-full'>
          <h4 className='font-semibold'>What you will learn</h4>
          <div className='space-y-2'>
            {/* {course?.willLearn.map((learn) => (
              <div className='flex space-x-4' key={learn}>
                <Check className='w-5 h-5 text-primary-600' />
                <p className='text-sm'>{learn}</p>
              </div>
            ))} */}
          </div>
          <Button className='w-full'>Add to cart</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CourseCardRow;
