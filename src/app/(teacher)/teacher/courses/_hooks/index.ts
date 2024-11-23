import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { createQuiz } from '@/api';
import { createVideo, deleteLessonById } from '@/api';
import { QueryKey } from '@/constant';
import { validateError } from '@/utils';

import { TQuizCredentials } from '@/types';
import { TVideoCredentials } from '@/types';

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteLessonById(id),
    onSuccess() {
      toast({ title: 'Delete lesson success!', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  return {
    progress,
    setProgress,
    ...useMutation({
      mutationFn: (video: TVideoCredentials) => createVideo(video, setProgress),
      onSuccess() {
        toast({ title: 'Create video success!', variant: 'success' });
        setProgress(0);
        queryClient.invalidateQueries({ queryKey: [QueryKey.Lessons] });
      },
      onError(error) {
        toast({ title: validateError(error), variant: 'destructive' });
        setProgress(0);
      },
    }),
  };
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (quiz: TQuizCredentials) => createQuiz(quiz),
    onSuccess() {
      toast({ title: 'Create quiz success!', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    onError(error) {
      toast({ title: validateError(error), variant: 'destructive' });
    },
  });
};
