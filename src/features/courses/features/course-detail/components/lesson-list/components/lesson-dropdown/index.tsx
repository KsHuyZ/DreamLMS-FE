import { ChevronDown } from 'lucide-react';
import React, { Dispatch, memo, SetStateAction, useMemo } from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import Unit from '@/features/courses/features/course-detail/components/lesson-list/components/lesson-dropdown/components/unit';
import { formatTime } from '@/utils';

import { EUnitType, Lesson } from '@/types';

interface LessonDropdownProps {
  lesson: Lesson;
  setSelectLessons: Dispatch<SetStateAction<string[]>>;
  selectLessons: string[];
}

const LessonDropdown = ({
  lesson,
  setSelectLessons,
  selectLessons,
}: LessonDropdownProps) => {
  const units = useMemo(() => {
    const videos = lesson.videos.map((video) => ({
      ...video,
      unit: EUnitType.VIDEO,
    }));
    const quizzes = lesson.quizzes.map((quiz) => ({
      ...quiz,
      unit: EUnitType.QUIZ,
    }));
    return [...videos, ...quizzes].sort(
      (a, b) => Number(a.order) - Number(b.order)
    );
  }, [lesson.videos, lesson.quizzes]);

  const totalDuration = useMemo(
    () =>
      lesson.videos.reduce((total, video) => {
        return total + (video.video?.duration ?? 0);
      }, 0),
    [lesson]
  );

  return (
    <div className='mb-4 duration-150'>
      <div className='flex items-center gap-x-2 border rounded-md text-sm mb-1 shadow-md p-4 text-muted-foreground font-bold'>
        <div className='flex items-center space-x-4'>
          <span>{lesson.name}</span>
          <Badge>{formatTime(totalDuration)}</Badge>
        </div>
        <div className='ml-auto pr-2 flex items-center gap-x-2'>
          <ChevronDown
            onClick={() =>
              setSelectLessons((prev) => {
                if (prev.includes(lesson.id)) {
                  return prev.filter((lessonId) => lessonId !== lesson.id);
                }
                return [...prev, lesson.id];
              })
            }
            className={cn(
              'w-4 h-4 cursor-pointer hover:opacity-75 transition text-primary-600 font-bold',
              selectLessons.includes(lesson.id) ? 'rotate-180' : ''
            )}
          />
        </div>
      </div>
      <div className='flex flex-col align-middle justify-center mx-auto'>
        <div
          className={cn(
            'no-scrollbar duration-700',
            selectLessons.includes(lesson.id)
              ? 'overflow-y-scroll max-h-[500px]'
              : 'max-h-0 overflow-hidden'
          )}
        >
          {selectLessons.includes(lesson.id) ? (
            <div className='flex flex-col space-y-8'>
              <div className='m-2 mx-4'>
                {units.map((unit) => (
                  <Unit key={unit.id} unit={unit} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(LessonDropdown);
