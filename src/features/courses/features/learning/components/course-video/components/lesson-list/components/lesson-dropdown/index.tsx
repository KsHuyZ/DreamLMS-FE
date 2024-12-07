import { ChevronDown } from 'lucide-react';
import React, { memo, useMemo } from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import Unit from '@/features/courses/features/course-detail/components/lesson-list/components/lesson-dropdown/components/unit';
import { TUnitParent } from '@/features/courses/features/learning/components/course-video';
import { formatTime } from '@/utils';

import { EUnitType, LessonProgress } from '@/types';

interface LessonDropdownProps {
  lesson: LessonProgress;
  onSelectLessons: (id: string) => void;
  selectLessons: string[];
  unitId?: string;
  onSelectUnit: (unit: TUnitParent) => void;
}

const LessonDropdown = ({
  lesson,
  onSelectLessons,
  selectLessons,
  unitId,
  onSelectUnit,
}: LessonDropdownProps) => {
  const units = useMemo(() => {
    const videos = lesson.videos.map((video) => ({
      ...video,
      unit: EUnitType.VIDEO,
      parentId: lesson.id,
    }));
    const quizzes = lesson.quizzes.map((quiz) => ({
      ...quiz,
      unit: EUnitType.QUIZ,
      parentId: lesson.id,
      isCompleted: false,
    }));
    return [...videos, ...quizzes].sort(
      (a, b) => Number(a.order) - Number(b.order)
    );
  }, [lesson.videos, lesson.quizzes, lesson.id]);

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
            onClick={() => onSelectLessons(lesson.id)}
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
                  <Unit
                    key={unit.id}
                    unit={unit}
                    isLearning
                    isFocus={unitId === unit.id}
                    onSelectUnit={onSelectUnit}
                  />
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
