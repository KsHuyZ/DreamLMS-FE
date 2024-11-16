import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import MinimalTiptapEditor from '@/components/ui/minimal-tiptap';
import { useToast } from '@/components/ui/use-toast';

import { useModificationLesson } from '@/feature/teacher/features/courses/hooks';
import { lessonSchema } from '@/validator';

import { Lesson, LessonCredentials } from '@/types';

interface ModalLessonProps {
  courseId: string;
  currentLesson?: Lesson;
  setCurrentLesson: (lesson: Lesson | undefined) => void;
  refetch: () => void;
}

const ModalLesson = ({
  courseId,
  currentLesson,
  setCurrentLesson,
  refetch,
}: ModalLessonProps) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync: modificationLesson } = useModificationLesson(
    currentLesson?.id
  );
  const form = useForm<LessonCredentials>({
    resolver: zodResolver(lessonSchema),
  });
  const { toast } = useToast();

  const onSubmit = useCallback(
    async (values: LessonCredentials) => {
      if (courseId) {
        const lessonValues = currentLesson
          ? { ...values, courseId, id: currentLesson.id }
          : { ...values, courseId };
        await modificationLesson(lessonValues);
        toast({
          variant: 'success',
          title: `Lesson ${currentLesson ? 'updated' : 'created'}!`,
        });
        setOpen(false);
        setCurrentLesson(undefined);
        refetch();
      }
    },
    [
      courseId,
      currentLesson,
      modificationLesson,
      setCurrentLesson,
      toast,
      refetch,
    ]
  );

  useEffect(() => {
    if (currentLesson) {
      setOpen(true);
      form.reset(currentLesson);
    } else {
      form.reset();
    }
  }, [currentLesson, form]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => !isPending && setOpen(value)}
      >
        <DialogContent
          onInteractOutside={(e) => {
            if (isPending) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Lesson</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Title'
                        {...field}
                        className='rounded-md'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        {...field}
                        immediatelyRender={false}
                        editorContentClassName='p-5'
                        output='html'
                        placeholder='Type your description here...'
                        autofocus={true}
                        editable={true}
                        editorClassName='focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end'>
                <Button type='submit' isLoading={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Button
        leftIcon={Plus}
        onClick={() => setOpen(true)}
        className='rounded-md w-full'
      >
        Add new Lesson
      </Button>
    </>
  );
};

export default memo(ModalLesson);
