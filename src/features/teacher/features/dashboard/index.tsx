'use client';

import { Ellipsis, TrendingUp } from 'lucide-react';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useAnalyzingTeacher } from '@/features/teacher/features/dashboard/hooks';

const TeacherHome = () => {
  const {
    enroll,
    activeCourses,
    completedCourses,
    totalCourses,
    totalReceived,
    isLoading,
  } = useAnalyzingTeacher();
  return (
    <div className='grid grid-cols-3 gap-3 px-7'>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Enrolled Courses
                </Label>
              </div>
              {isLoading ? (
                <Skeleton className='w-16 h-4' />
              ) : (
                <Label className='text-4xl group-hover:text-white'>
                  {enroll?.total}
                </Label>
              )}
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Active Courses
                </Label>
              </div>
              {isLoading ? (
                <Skeleton className='w-16 h-4' />
              ) : (
                <Label className='text-4xl group-hover:text-white'>
                  {activeCourses?.total}
                </Label>
              )}
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Completed Courses
                </Label>
              </div>
              {isLoading ? (
                <Skeleton className='w-16 h-4' />
              ) : (
                <Label className='text-4xl group-hover:text-white'>
                  {completedCourses?.total}
                </Label>
              )}
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Total Students
                </Label>
              </div>
              {isLoading ? (
                <Skeleton className='w-16 h-4' />
              ) : (
                <Label className='text-4xl group-hover:text-white'>
                  {enroll?.total}
                </Label>
              )}
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Total Courses
                </Label>
              </div>
              {isLoading ? (
                <Skeleton className='w-16 h-4' />
              ) : (
                <Label className='text-4xl group-hover:text-white'>
                  {totalCourses?.total}
                </Label>
              )}
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Total Earnings
                </Label>
              </div>
              <div className='flex flex-col space-y-2'>
                {isLoading ? (
                  <>
                    <Skeleton className='w-16 h-4' />
                    <Skeleton className='w-16 h-4' />
                  </>
                ) : (
                  <>
                    <Label className='text-2xl group-hover:text-white'>
                      {totalReceived?.dollar} Dollar
                    </Label>
                    <Label className='text-2xl group-hover:text-white'>
                      {totalReceived?.eth} ETH
                    </Label>
                  </>
                )}
              </div>
            </div>
            <Ellipsis className='w-5 h-5 cursor-pointer group-hover:text-white' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherHome;
