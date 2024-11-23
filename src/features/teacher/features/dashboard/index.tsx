import { Ellipsis, TrendingUp } from 'lucide-react';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const TeacherHome = () => {
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
              <Label className='text-4xl group-hover:text-white'>14</Label>
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
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Active Courses
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
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Completed Courses
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
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Total Students
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
      <Card className='shadow-md group hover:bg-primary-600 duration-200'>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label className='text-muted-foreground font-bold text-xl group-hover:text-white'>
                  Total Courses
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
