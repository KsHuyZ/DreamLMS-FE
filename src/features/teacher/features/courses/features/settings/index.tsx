'use client';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { useFormCourseContext } from '@/features/teacher/features/courses/components/tab-form';
import ModalStatus from '@/features/teacher/features/courses/features/settings/components/modal-status';
import { useRemoveCourse } from '@/features/teacher/features/courses/features/settings/hooks';

import { ECourseStatus } from '@/types';

const SettingCourse = () => {
  const { id } = useParams();
  const { courseInfo, refetch } = useFormCourseContext();
  const [value, setValue] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutateAsync: removeCourse, isPending } = useRemoveCourse(
    id as string
  );

  const isError = useMemo(
    () => value.length > 1 && value !== courseInfo?.name && isSubmit,
    [value, courseInfo, isSubmit]
  );
  const onSubmit = useCallback(async () => {
    setIsSubmit(true);
    if (isError) return;
    await removeCourse();
    setOpen(false);
  }, [removeCourse, isError]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete course</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <span className='text-muted-foreground text-sm'>
              This course will be deleted, along with all of its Lessons,
              Videos, Files and Settings.
            </span>
            <div className='bg-red-200 text-red-600 rounded-md border-red-100 p-2'>
              <span className='font-bold text-md'>
                Warning:{' '}
                <span className='font-normal'>
                  This action is not reversible. Please be certain.
                </span>
              </span>
            </div>
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2'>
              <span className='text-muted-foreground'>
                Enter the course name{' '}
                <b className='text-black font-bold'>{courseInfo?.name}</b> to
                continue:
              </span>
              <div className='space-y-1'>
                <Input onChange={(e) => setValue(e.target.value)} />
                {isError && (
                  <p className='text-sm font-medium text-red-500'>
                    Please enter {courseInfo?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              variant='error'
              onClick={onSubmit}
              isLoading={isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className='flex flex-col space-y-4'>
        <Card className='shadow-sm'>
          <CardContent>
            <div className='items-center'>
              <div className='flex items-center justify-between'>
                <div className='flex-col space-y-2'>
                  <p className='text-lg'>Change course visibility</p>
                  <span className='text-sm text-muted-foreground'>
                    This course currently is{' '}
                    {courseInfo?.status === ECourseStatus.Publish
                      ? 'Publish'
                      : 'Private'}
                  </span>
                </div>
                <ModalStatus
                  id={id as string}
                  newStatus={
                    courseInfo?.status === ECourseStatus.Publish
                      ? ECourseStatus.Draft
                      : ECourseStatus.Publish
                  }
                  refetch={refetch}
                />
              </div>
              <Separator className='my-4' />
              <div className='flex items-center justify-between'>
                <div className='flex-col space-y-2'>
                  <p className='text-lg'>Change this course</p>
                  <span className='text-sm text-error'>
                    This course will be remove!
                  </span>
                </div>
                <Button variant='error' onClick={() => setOpen(true)}>
                  Delete this course
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingCourse;
