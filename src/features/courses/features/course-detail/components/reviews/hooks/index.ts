import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { createReview, getReviewsByCourseId } from '@/api';
import { QueryKey } from '@/constant';

export const useReviews = (
  courseId: string,
  limit = 10,
  stars = [1, 2, 3, 4, 5]
) =>
  useInfiniteQuery({
    queryKey: [QueryKey.Reviews, limit, courseId, stars],
    queryFn: () => getReviewsByCourseId(courseId, undefined, undefined, stars),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

export const useCreateReview = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast({ variant: 'success', title: 'Review created successfully' });
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Failed to create review' });
    },
  });
};
