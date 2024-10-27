'use client';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useMyCourse } from '@/app/(global)/_hooks';

const MyCourse = () => {
  const { data, isLoading } = useMyCourse();

  return (
    <>
      {!isLoading && (!data || data?.length === 0) ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='flex flex-col space-y-4 items-center'>
            <Image
              src='/images/empty.svg'
              width={150}
              height={150}
              alt='empty'
            />
            <Label>You don't learn any course</Label>
            <Link href='/courses'>
              <Button>Explore now</Button>
            </Link>
          </div>
        </div>
      ) : null}
      <div className='flex flex-col space-y-4'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card key={index}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between cursor-pointer duration-200 p-2 rounded-sm'>
                    <div className='flex items-center space-x-4'>
                      <Skeleton className='w-40 h-20' />
                      <div className='flex flex-col space-y-2'>
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-20 h-2' />
                      </div>
                    </div>
                    <div className='flex items-center space-x-8'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='w-10 h-4' />
                      </div>
                      <Skeleton className='w-20 h-8' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : data &&
            data.map((course) => (
              <Card key={course.id} className='rounded-md shadow-md'>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between cursor-pointer duration-200 p-2 rounded-sm'>
                    <div className='flex items-center space-x-4'>
                      <Image
                        src={course.image.url}
                        width={120}
                        height={120}
                        alt='Course img'
                        className='rounded-md overflow-hidden'
                      />
                      <div className='flex flex-col space-y-2'>
                        <Label>{course.name}</Label>
                        <span className='text-sm'>By Phan Tien huy</span>
                      </div>
                    </div>
                    <div className='flex items-center space-x-8'>
                      <div className='flex items-center space-x-2'>
                        <Clock />
                        <Label>06h 30m</Label>
                      </div>
                      <Link href={`/courses/learning/${course.id}`}>
                        <Button>View Course</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  );
};

export default MyCourse;
