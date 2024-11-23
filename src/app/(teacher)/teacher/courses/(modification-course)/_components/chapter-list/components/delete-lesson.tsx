import { Trash } from 'lucide-react';
import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteLesson } from '@/app/(teacher)/teacher/courses/_hooks';

import { Lesson } from '@/types';

const DeleteLesson = ({ lesson }: { lesson: Lesson }) => {
  const { mutateAsync: deleteLesson, isPending } = useDeleteLesson();
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Trash
        className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
        onClick={() => setOpen(true)}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely delete this lesson?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button isLoading={isPending} onClick={() => deleteLesson(lesson.id)}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLesson;
