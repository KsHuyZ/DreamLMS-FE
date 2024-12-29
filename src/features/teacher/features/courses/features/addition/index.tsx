'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { useDebounce } from '@/hooks';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useFormCourseContext } from '@/features/teacher/features/courses/components/tab-form';
import { useCourseAddition } from '@/features/teacher/features/courses/features/addition/hooks';
import VideoUploader from '@/features/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/form-video/components/video-uploader';

import { TCourse } from '@/types';

const Addition = () => {
  const {
    formAddition,
    selectedCourse,
    setSelectedCourse,
    selectedCourseIds,
    isLoading: courseInfoLoading,
  } = useFormCourseContext();
  const [value, setValue] = useState('');
  const valueDebounce = useDebounce(value);
  const { data: courses, isLoading } = useCourseAddition(
    selectedCourseIds,
    valueDebounce
  );

  const onSelectCourse = useCallback(
    (course: TCourse) => {
      setSelectedCourse((prev) => [...prev, course]);
      setValue('');
    },
    [setSelectedCourse]
  );

  const onRemoveCourse = useCallback(
    (id: string) => {
      setSelectedCourse((prev) => prev.filter((course) => course.id !== id));
    },
    [setSelectedCourse]
  );

  return (
    <div className='flex flex-col space-y-4 min-h-[calc(100vh-400px)]'>
      <Form {...formAddition}>
        <form className='space-y-8'>
          <FormField
            control={formAddition.control}
            name='video'
            render={() => (
              <FormItem>
                <FormLabel>Video Preview</FormLabel>
                <FormControl>
                  <VideoUploader
                    onChange={(e) => {
                      formAddition.setValue(
                        'video',
                        e.target.files?.[0] as File
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-8'>
            <div className='space-y-4'>
              <Label>Course Related</Label>
              <Command
                className='rounded-lg border shadow-md md:min-w-[450px]'
                shouldFilter={false}
              >
                <CommandInput
                  placeholder='Type a course name...'
                  value={value}
                  onValueChange={setValue}
                  isLoading={isLoading}
                />
                <CommandList>
                  {valueDebounce.length > 0 ? (
                    <>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {courses && courses.length > 0 && (
                        <CommandGroup heading='Suggestions'>
                          {courses?.map((course) => (
                            <CommandItem
                              key={course.id}
                              onSelect={() => onSelectCourse(course)}
                            >
                              <div className='flex items-center space-x-4'>
                                <Image
                                  src={course.image.url}
                                  alt={course.name}
                                  width={80}
                                  height={80}
                                  className='rounded-md'
                                />
                                <div className='flex flex-col space-y-2'>
                                  <Label className='font-bold'>
                                    {course.name}
                                  </Label>
                                  <span className='text-muted-foreground text-sm'>
                                    {course.createdBy.firstName}{' '}
                                    {course.createdBy.lastName}
                                  </span>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </CommandList>
              </Command>
            </div>
            <div className='space-y-4'>
              {courseInfoLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      className='flex items-center justify-between shadow-md rounded-md p-4 border'
                      key={index}
                    >
                      <div className='flex items-center space-x-4'>
                        <Skeleton className='w-32 h-20' />
                        <div className='flex flex-col space-y-2'>
                          <Skeleton className='w-12 h-4' />
                          <Skeleton className='w-10 h-2' />
                        </div>
                      </div>
                    </div>
                  ))
                : selectedCourse.map((course) => (
                    <div
                      className='flex items-center justify-between shadow-md rounded-md p-4 border'
                      key={course.id}
                    >
                      <div className='flex items-center space-x-4'>
                        <Image
                          src={course.image.url}
                          alt={course.name}
                          width={100}
                          height={100}
                          className='rounded-md'
                        />
                        <div className='flex flex-col space-y-2'>
                          <Label className='font-bold text-lg'>
                            {course.name}
                          </Label>
                          <span className='text-muted-foreground text-sm'>
                            {course.createdBy.firstName}{' '}
                            {course.createdBy.lastName}
                          </span>
                        </div>
                      </div>
                      <button
                        className='p-2 rounded-full hover:bg-slate-300 duration-150 cursor-pointer'
                        onClick={() => onRemoveCourse(course.id)}
                        type='button'
                      >
                        <Trash className='text-error w-4 h-4' />
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Addition;
