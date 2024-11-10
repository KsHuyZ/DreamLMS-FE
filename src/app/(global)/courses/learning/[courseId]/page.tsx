import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';

import { getCookies } from '@/lib/action';

import Spinner from '@/components/loading/spinner';
import NextImage from '@/components/NextImage';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import CourseVideo from '@/app/(global)/courses/learning/[courseId]/_components/units';

import { TUser } from '@/types';

interface LearningPageProps {
  params: {
    courseId: string;
  };
}

const LearningPage = ({ params: { courseId } }: LearningPageProps) => {
  const user = getCookies('user') as TUser;
  return (
    <div className='w-screen min-h-screen bg-background/90 backdrop-blur-sm z-50 fixed top-0 left-0'>
      <div className='flex flex-col h-full space-y-4'>
        <div className='flex items-center sticky m-2'>
          <Button variant='ghost'>
            <Link href='/'>
              <ChevronLeft className='w-6 h-6' />
            </Link>
          </Button>
          <Link
            href='#'
            className='flex items-center text-2xl font-semibold text-gray-900 '
          >
            <NextImage
              className='w-8 h-8 mr-2'
              src='/images/logo.svg'
              alt='logo'
              width={30}
              height={30}
            />
            <Label>EduWise</Label>
          </Link>
        </div>
        <div>
          <Suspense fallback={<Spinner />}>
            <CourseVideo id={courseId} userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
