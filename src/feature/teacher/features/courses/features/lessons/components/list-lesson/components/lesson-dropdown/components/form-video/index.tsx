'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Plus } from 'lucide-react';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import MinimalTiptapEditor from '@/components/ui/minimal-tiptap';
import { Progress } from '@/components/ui/progress';

import { useCreateVideo } from '@/app/(global)/teacher/courses/_hooks';
import VideoUploader from '@/feature/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/form-video/components/video-uploader';
import { createVideoSchema } from '@/validator';

import { TUnit, TVideoCredentials } from '@/types';

interface IFormProps {
  lessonId?: string;
  unit?: TUnit;
  setUnit: Dispatch<SetStateAction<TUnit | undefined>>;
  refetch: () => void;
}

const defaultValues = {
  title: '',
  description: '',
  video: undefined,
  isFree: false,
};

const FormVideo = ({ lessonId, unit, setUnit, refetch }: IFormProps) => {
  const form = useForm<TVideoCredentials>({
    defaultValues,
    resolver: zodResolver(createVideoSchema),
  });
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: createVideo,
    isPending,
    progress,
    setProgress,
  } = useCreateVideo();

  const onSubmit = useCallback(async () => {
    const values = form.getValues();
    if (lessonId && values.video) {
      await createVideo({ ...values, lessonId });
      setOpen(false);
      setUnit(undefined);
      refetch();
    }
  }, [createVideo, form, lessonId, setUnit, refetch]);

  useEffect(() => {
    if (unit) {
      setOpen(true);
      form.reset(unit);
      form.setValue('video', unit.video);
    }
  }, [setOpen, form, unit]);

  const onClose = useCallback(
    (value: boolean) => {
      if (!value && isPending) {
        return;
      }
      if (!value) {
        form.reset(defaultValues);
        setUnit(undefined);
      }
      setOpen(value);
    },
    [setOpen, form, isPending, setUnit]
  );

  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Lesson
      </Button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='min-w-[1000px]'>
          <DialogHeader>
            <DialogTitle>{unit ? 'Edit' : 'Create'} Video</DialogTitle>
          </DialogHeader>
          <div className='overflow-y-scroll no-scrollbar'>
            <div className='w-full'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-4'>
                      <FormField
                        control={form.control}
                        name='video'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                              <VideoUploader
                                onChange={(e) => {
                                  form.setValue(
                                    'video',
                                    e.target.files
                                      ? e.target.files[0]
                                      : undefined
                                  );
                                  setProgress(0);
                                }}
                                value={field.value as unknown as string}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Progress value={progress} className='w-full h-1' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                      <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Eg: Introdution'
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <MinimalTiptapEditor
                                {...field}
                                immediatelyRender={false}
                                className='w-full'
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
                      <FormField
                        control={form.control}
                        name='isFree'
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center space-x-2'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Enable Video Preview</FormLabel>
                            </div>
                            <FormDescription className='flex items-center space-x-2'>
                              <AlertCircle className='w-5 h-5' />{' '}
                              <span>
                                If checked, any users/guest can view this lesson
                                without enroll course
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              isLoading={isPending}
              onClick={onSubmit}
              className='rounded-md'
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(FormVideo);
