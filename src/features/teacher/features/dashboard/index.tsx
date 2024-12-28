'use client';

import { Ellipsis, TrendingUp } from 'lucide-react';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useAnalyzingTeacher } from '@/features/teacher/features/dashboard/hooks';

const TeacherHome = () => {
  const { enroll, activeCourses, completedCourses, totalCourses, isLoading } =
    useAnalyzingTeacher();
  // console.log
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
              {isLoading ? (
                <Skeleton className='w-28 h-4' />
              ) : (
                <div className='flex items-center text-sm space-x-2'>
                  <TrendingUp className='text-emerald-600 group-hover:text-white w-5 h-5' />
                  <span className='text-emerald-600 group-hover:text-white'>
                    {enroll?.percentage}%
                  </span>
                  <span className='text-muted-foreground group-hover:text-white'>
                    vs last month
                  </span>
                </div>
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
              {isLoading ? (
                <Skeleton className='w-28 h-4' />
              ) : (
                <div className='flex items-center text-sm space-x-2'>
                  <TrendingUp className='text-emerald-600 group-hover:text-white w-5 h-5' />
                  <span className='text-emerald-600 group-hover:text-white'>
                    {activeCourses?.percentage}%
                  </span>
                  <span className='text-muted-foreground group-hover:text-white'>
                    vs last month
                  </span>
                </div>
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
              {isLoading ? (
                <Skeleton className='w-28 h-4' />
              ) : (
                <div className='flex items-center text-sm space-x-2'>
                  <TrendingUp className='text-emerald-600 group-hover:text-white w-5 h-5' />
                  <span className='text-emerald-600 group-hover:text-white'>
                    {completedCourses?.percentage}%
                  </span>
                  <span className='text-muted-foreground group-hover:text-white'>
                    vs last month
                  </span>
                </div>
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
              {isLoading ? (
                <Skeleton className='w-28 h-4' />
              ) : (
                <div className='flex items-center text-sm space-x-2'>
                  <TrendingUp className='text-emerald-600 group-hover:text-white w-5 h-5' />
                  <span className='text-emerald-600 group-hover:text-white'>
                    {enroll?.percentage}%
                  </span>
                  <span className='text-muted-foreground group-hover:text-white'>
                    vs last month
                  </span>
                </div>
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
              {isLoading ? (
                <Skeleton className='w-28 h-4' />
              ) : (
                <div className='flex items-center text-sm space-x-2'>
                  <TrendingUp className='text-emerald-600 group-hover:text-white w-5 h-5' />
                  <span className='text-emerald-600 group-hover:text-white'>
                    {totalCourses?.percentage}%
                  </span>
                  <span className='text-muted-foreground group-hover:text-white'>
                    vs last month
                  </span>
                </div>
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
              <Label className='text-4xl group-hover:text-white'>8</Label>
              <div className='flex items-center text-sm space-x-2'>
                <TrendingUp className='text-primary-600 group-hover:text-white w-5 h-5' />
                <span className='text-primary-600 group-hover:text-white'>
                  5%
                </span>
                <span className='text-muted-foreground group-hover:text-white'>
                  vs last month
                </span>
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
