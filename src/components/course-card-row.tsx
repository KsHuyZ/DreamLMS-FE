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

import { formatPrice } from '@/utils';

const CourseCardRow = ({ course }: CourseCardProps) => {
  return (
    <HoverCard openDelay={0.5} closeDelay={0.5}>
      <HoverCardTrigger asChild>
        <Link
          href={`/course/${course?.id}`}
          className='flex justify-between p-4 rounded-md border duration-500 hover:shadow-md'
        >
          <div className='flex items-center space-x-4'>
            <Image
              src={course?.image.url ?? ''}
              alt='image'
              width={250}
              height={200}
              className='rounded-md'
            />
            <div className='flex flex-col space-y-2'>
              <span className='font-bold text-lg'>{course?.name}</span>
              <div className='flex flex-col space-y-1'>
                <span>{course?.shortDescription}</span>
                <span className='text-muted-foreground text-sm'>
                  {course?.createdBy.firstName} {course?.createdBy.lastName}
                </span>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className='text-yellow-300 w-4 h-4'
                      fill='#fde047'
                    />
                  ))}{' '}
                  <p className='text-tertiary-800 duration-150'>5 (200)</p>
                </div>
                <div className='flex items-center space-x-1 text-muted-foreground text-sm'>
                  <span>14.5 total hours</span>
                  <span className='text-xs'>●</span>
                  <span>20 lessons</span>
                  <span className='text-xs'>●</span>
                  <span>All levels</span>
                </div>
              </div>
            </div>
          </div>
          <p className='font-bold text-lg'>{formatPrice(course?.price)}</p>
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
