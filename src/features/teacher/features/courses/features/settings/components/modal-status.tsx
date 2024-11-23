import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

import { QueryKey } from '@/constant';
import { useChangeCourseStatus } from '@/features/teacher/features/courses/features/settings/hooks';

import { ECourseStatus } from '@/types';

interface ModalStatusProps {
  newStatus: ECourseStatus;
  id: string;
  refetch: () => void;
}

const ModalStatus = ({ newStatus, id, refetch }: ModalStatusProps) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync: updateStatus, isPending } = useChangeCourseStatus(
    id as string
  );

  const onSubmit = useCallback(async () => {
    await updateStatus(newStatus);
    queryClient.invalidateQueries({ queryKey: [QueryKey.TeacherCourse] });
    toast({
      title:
        newStatus === ECourseStatus.Publish
          ? 'Publish course success'
          : 'Change course to draft',
      variant: 'success',
    });
    refetch();
    setOpen(false);
  }, [newStatus, toast, updateStatus, refetch]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {newStatus === ECourseStatus.Publish ? 'Publish' : 'Draft'} course
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {newStatus === ECourseStatus.Publish ? 'Publish' : 'Draft'}{' '}
              course?
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='bg-red-200 text-red-600 rounded-md border-red-100 p-2'>
              <span className='font-bold text-md'>
                Warning:{' '}
                <span className='font-normal'>
                  This action will be publish course
                </span>
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' onClick={onSubmit} isLoading={isPending}>
              {newStatus === ECourseStatus.Publish ? 'Publish' : 'Draft'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalStatus;
