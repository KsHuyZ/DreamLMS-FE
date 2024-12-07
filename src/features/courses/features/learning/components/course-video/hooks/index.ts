import { useMutation, useQuery } from '@tanstack/react-query';

import {
  completeVideo,
  getLessonByLearnCourseId,
  getLessonsByCourseId,
} from '@/api';
import { QueryKey } from '@/constant';

export const useCompletedVideo = () =>
  useMutation({
    mutationFn: (id: string) => completeVideo(id),
  });

export const useLessonLearning = (id: string) =>
  useQuery({
    queryKey: [QueryKey.LessonsLearn, id],
    queryFn: () => getLessonByLearnCourseId(id),
  });
