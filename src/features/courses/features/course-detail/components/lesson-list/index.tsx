'use client';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

import LessonDropdown from '@/features/courses/features/course-detail/components/lesson-list/components/lesson-dropdown';
import { useLessonList } from '@/features/courses/features/course-detail/components/lesson-list/hooks';

interface LessonListProps {
  id: string;
}

const LessonList = ({ id }: LessonListProps) => {
  const { data: lessons, isLoading } = useLessonList(id);
  const [selectLessons, setSelectLessons] = useState<string[]>([]);

  const lessonIds =
    useMemo(() => lessons?.map((lesson) => lesson.id), [lessons]) ?? [];

  const handleExpandAll = () => {
    if (selectLessons.length !== lessons?.length) {
      setSelectLessons(lessonIds);
    } else {
      setSelectLessons([]);
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
          {selectLessons.length === lessonIds?.length ? 'Close' : 'Expand'} All
          Sections
        </Button>
      </div>
      <div className='mb-4 duration-150 space-y-2'>
        {lessons?.map((lesson) => (
          <LessonDropdown
            key={lesson.id}
            setSelectLessons={setSelectLessons}
            selectLessons={selectLessons}
            lesson={lesson}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonList;
