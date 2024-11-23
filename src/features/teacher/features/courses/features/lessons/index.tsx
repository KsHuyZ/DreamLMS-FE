'use client';

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

import { useToast } from '@/components/ui/use-toast';

import { ListLesson } from '@/features/teacher/features/courses/features/lessons/components/list-lesson';
import ModalLesson from '@/features/teacher/features/courses/features/lessons/components/modal-lesson';
import { useLessons } from '@/features/teacher/features/courses/hooks';

import { Lesson as LessonType } from '@/types';

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonType | undefined>();
  const { data: lessons, isLoading, refetch } = useLessons(id);
  const { toast } = useToast();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      toast({ title: 'Chapters reordered', variant: 'success' });
    } catch {
      toast({ title: 'Something went wrong', variant: 'destructive' });
    }
  };

  return (
    <>
      <div className='relative p-4 overflow-y-auto min-h-[calc(100vh-500px)]'>
        {isUpdating && (
          <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
            <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
          </div>
        )}
        <div className={cn('text-sm mt-2', 'text-slate-500')}>
          <ListLesson
            loading={isLoading}
            onReorder={onReorder}
            items={lessons ?? []}
            onSelectLesson={(lesson) => setCurrentLesson(lesson)}
            refetch={refetch}
          />
        </div>
      </div>
      <ModalLesson
        setCurrentLesson={setCurrentLesson}
        currentLesson={currentLesson}
        courseId={id ?? ''}
        refetch={refetch}
      />
    </>
  );
};

export default Lesson;
