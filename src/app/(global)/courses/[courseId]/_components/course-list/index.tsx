'use client';
import {
  BookOpen,
  ChevronDown,
  Clock,
  PlayCircle,
  StickyNote,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useLessonList } from '@/app/(global)/courses/_hooks';

import { EUnitType } from '@/types';

interface CourseListProps {
  id: string;
}

const CourseList = ({ id }: CourseListProps) => {
  const { data, isLoading } = useLessonList(id);
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);

  const lessons = useMemo(() => data?.map((lesson) => lesson.id), [data]) ?? [];

  // const units = useMemo(() => {
  //   const videos = lesson.videos.map((video) => ({
  //     ...video,
  //     unit: EUnitType.VIDEO,
  //   }));
  //   const quizzes = lesson.quizzes.map((quiz) => ({
  //     ...quiz,
  //     unit: EUnitType.QUIZ,
  //   }));
  //   return [...videos, ...quizzes].sort(
  //     (a, b) => Number(a.order) - Number(b.order)
  //   );
  // }, [lesson.videos, lesson.quizzes]);

  const handleExpandAll = () => {
    if (currentLesson.length !== data?.length) {
      setCurrentLesson(lessons);
    } else {
      setCurrentLesson([]);
    }
  };

  return (
    <div className='w-full px-2'>
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          className='text-primary-600'
          onClick={handleExpandAll}
        >
          {currentLesson.length === data?.length ? 'Close' : 'Expand'} All
          Sections
        </Button>
      </div>
      <div className='mb-4 duration-150 space-y-2'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className='border-sky-200 bg-primary-50 shadow-sm'
              >
                <div
                  className={cn(
                    'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md p-4 text-sm mb-1 cursor-pointer',
                    'bg-sky-100  text-primary-700'
                  )}
                >
                  <span className='font-bold '>
                    <Skeleton className='w-64 h-4' />
                  </span>
                  <div className='ml-auto pr-2 flex items-center gap-x-2'>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 cursor-pointer hover:opacity-75 transition'
                      )}
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    'no-scrollbar duration-700 max-h-0 overflow-hidden'
                  )}
                ></div>
              </div>
            ))
          : data?.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  'duration-150 hover:border-primary-300 border rounded-md',
                  currentLesson.includes(lesson.id) ? 'border-primary-300' : ''
                )}
              >
                {/* <div
                  className={cn(
                    'flex items-center gap-x-2 text-slate-700 p-2 px-4 text-sm cursor-pointer'
                  )}
                  onClick={() =>
                    setCurrentLesson((prev) => {
                      if (prev.includes(lesson.id)) {
                        return prev.filter((item) => item !== lesson.id);
                      }
                      return [...prev, lesson.id];
                    })
                  }
                >
                  <div className='flex flex-col'>
                    <span
                      className={cn(
                        currentLesson.includes(lesson.id)
                          ? 'text-primary-600'
                          : '',
                        'font-bold duration-700'
                      )}
                    >
                      {lesson.name}
                    </span>
                    <div className='flex space-x-2 items-center'>
                      <Clock size={15} />
                      <span
                        className={cn(
                          currentLesson.includes(lesson.id)
                            ? 'text-primary-600'
                            : '',
                          'text-sm duration-700 hover:text-primary-600'
                        )}
                      >
                        20:20
                      </span>
                    </div>
                  </div>

                  <div className='ml-auto pr-2 flex items-center gap-x-2'>
                    <div className='flex flex-col items-end'>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 cursor-pointer hover:opacity-75 transition hover:text-primary-600',
                          currentLesson.includes(lesson.id)
                            ? 'rotate-180 text-primary-600'
                            : ''
                        )}
                      />
                      <div
                        className={cn(
                          currentLesson.includes(lesson.id)
                            ? 'text-primary-600'
                            : '',
                          'text-sm duration-700 hover:text-primary-600 flex items-center space-x-2'
                        )}
                      >
                        <BookOpen size={15} />
                        <span>
                          {lesson.units?.length} lesson
                          {Number(lesson.units?.length) > 0 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div
                  className={cn(
                    'no-scrollbar duration-700',
                    currentLesson.includes(lesson.id)
                      ? 'max-h-[200px] overflow-y-scroll'
                      : 'max-h-0 overflow-hidden'
                  )}
                >
                  {lesson.units?.map((video, index) => (
                    <div
                      key={video.id}
                      className={cn('flex items-center space-x-2 ')}
                    >
                      <div
                        key={`video_${video.id}`}
                        className='cursor-pointer w-full hover:bg-gray-200 m-2 p-2 rounded-sm transition'
                      >
                        <div className='flex items-center mx-3 justify-between'>
                          <div className='flex flex-col'>
                            <span className='text-primary-600'>
                              {index + 1}.{' '}
                              {video.type === EUnitType.VIDEO
                                ? 'Lesson'
                                : 'Quiz'}
                              : {video.title}
                            </span>
                            <div className='flex items-center text-xs'>
                              {video.type === EUnitType.VIDEO ? (
                                <PlayCircle size={15} />
                              ) : (
                                <StickyNote size={15} />
                              )}{' '}
                              <span className='ml-2'>20:00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default CourseList;
