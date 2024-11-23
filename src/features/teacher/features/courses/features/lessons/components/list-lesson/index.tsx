'use client';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Spinner from '@/components/loading/spinner';
import { Label } from '@/components/ui/label';

import LessonDropdown from '@/features/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown';

import { Lesson, TUnit } from '@/types';

interface ListLessonProps {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  loading?: boolean;
  onSelectLesson: (lesson: Lesson) => void;
  refetch: () => void;
}

export const ListLesson = ({
  items,
  onReorder,
  loading,
  onSelectLesson,
  refetch,
}: ListLessonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lessons, setLessons] = useState(items);
  const [currentLesson, setCurrentLesson] = useState<undefined | string>(
    undefined
  );
  const [selectEdit, setSelectEdit] = useState<TUnit | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setLessons(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='duration-150'
          >
            {loading ? (
              <div className='h-full'>
                <div className='flex items-center justify-center'>
                  <Spinner />
                </div>
              </div>
            ) : lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <LessonDropdown
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  onSelectLesson={onSelectLesson}
                  setCurrentLesson={setCurrentLesson}
                  setSelectEdit={setSelectEdit}
                  currentLesson={currentLesson}
                  selectEdit={selectEdit}
                  refetch={refetch}
                />
              ))
            ) : (
              <div className='flex flex-col space-y-4 items-center'>
                <Image
                  src='/images/empty.svg'
                  width={100}
                  height={100}
                  alt='Empty image'
                  className='rounded-md overflow-hidden'
                />
                <Label>This course don't have any lessons</Label>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
