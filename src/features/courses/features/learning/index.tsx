import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import { getCookies } from '@/lib/action';

import Spinner from '@/components/loading/spinner';

import { getCourseLearn } from '@/api';

import { TUser } from '@/types';

interface LearningPageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata(
  { params }: LearningPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const course = await getCourseLearn(params.courseId);
  return {
    title: course.name,
    openGraph: {
      images: [course.image.url],
    },
  };
}

const CourseVideo = dynamic(
  () => import('@/features/courses/features/learning/components/course-video'),
  {
    loading: () => <Spinner />,
  }
);

const LearningPage = async ({ params: { courseId } }: LearningPageProps) => {
  const course = await getCourseLearn(courseId);
  return (
    <div className='flex flex-col h-full space-y-4'>
      <CourseVideo course={course} />
    </div>
  );
};

export default LearningPage;
