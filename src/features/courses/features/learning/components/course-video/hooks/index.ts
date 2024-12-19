import { useMutation, useQuery } from '@tanstack/react-query';

import {
  completeVideo,
  createCertificate,
  getLessonByLearnCourseId,
  startTest,
} from '@/api';
import { QueryKey } from '@/constant';

export const useCompletedVideo = (id?: string) =>
  useMutation({
    mutationFn: () => completeVideo(id),
  });

export const useLessonLearning = (id: string) =>
  useQuery({
    queryKey: [QueryKey.LessonsLearn, id],
    queryFn: () => getLessonByLearnCourseId(id),
  });

export const useStartQuiz = () =>
  useMutation({
    mutationFn: (id: string) => startTest(id),
  });
export const useCreateCertificate = (courseId: string, open: boolean) =>
  useQuery({
    queryFn: () => createCertificate(courseId),
    queryKey: [QueryKey.Certificate, courseId],
    enabled: !!courseId && open,
  });
