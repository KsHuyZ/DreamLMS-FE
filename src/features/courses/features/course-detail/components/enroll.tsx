'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useEnrollCourse } from '@/features/courses/features/course-detail/hooks';

const Enroll = ({ id }: { id: string }) => {
  const { mutateAsync, isPending } = useEnrollCourse();
  const router = useRouter();
  const { courseId } = useParams();
  const onEnrollCourse = async (id: string) => {
    await mutateAsync(id);
    router.replace(`/enroll/course/${courseId}`);
  };
  return (
    <Button onClick={() => onEnrollCourse(id)} isLoading={isPending}>
      Enroll Now
    </Button>
  );
};

export default Enroll;
