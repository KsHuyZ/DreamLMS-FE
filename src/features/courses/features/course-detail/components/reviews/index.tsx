import { formatDistanceToNow } from 'date-fns';
import { EllipsisVertical, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import ModalListReview from '@/features/courses/features/course-detail/components/reviews/components/modal-list-review';
import ModalReview from '@/features/courses/features/course-detail/components/reviews/components/modal-review';

import { PaginationResponse, TReview } from '@/types';

interface Props {
  courseId: string;
  isEnrolled: boolean;
  reviewPagination: PaginationResponse<TReview> & {
    avgRate: number;
    alreadyRated: boolean;
  };
}

const Reviews = ({ courseId, isEnrolled, reviewPagination }: Props) => {
  const { data: reviews, total, alreadyRated, avgRate } = reviewPagination;
  return (
    <div className='flex flex-col space-y-8 px-5 xl:px-0 xl:container pt-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Star className='text-yellow-300 w-5 h-5' fill='#fde047' />
          <h3>
            {avgRate} star {total} rates
          </h3>
        </div>
        {isEnrolled && !alreadyRated && <ModalReview courseId={courseId} />}
      </div>
      {reviews.length === 0 && (
        <div className='flex flex-col space-y-4 items-center'>
          <Image src='/images/empty.svg' width={150} height={150} alt='empty' />
          <Label>It's look like this course don't have any review</Label>
        </div>
      )}
      <div className='grid grid-cols-2 gap-3'>
        {reviews.map((review) => (
          <Card
            className='border-primary-600 border-2 shadow-md'
            key={review.id}
          >
            <CardContent className='flex flex-col space-y-4'>
              <div className='flex justify-between'>
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Image
                      src='/images/avatar.jpg'
                      width={40}
                      height={40}
                      alt='avatar'
                      className='rounded-full'
                    />
                    <div className='flex flex-col'>
                      <span className='font-bold p-0 m-0'>
                        {review.user.firstName} {review.user.lastName}
                      </span>
                      <div className='text-muted-foreground text-sm p-0 m-0 flex items-center space-x-1'>
                        <span>{formatDistanceToNow(review.createdAt)} -</span>{' '}
                        <div className='flex items-center space-x-1'>
                          {Array.from({ length: review.star }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                className='text-yellow-300 w-4 h-4'
                                fill='#fde047'
                              />
                            )
                          )}
                          {Array.from({ length: 5 - review.star }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                className='text-yellow-300 w-4 h-4'
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button>
                  <EllipsisVertical className='w-4 h-4' />
                </button>
              </div>
              <div className='flex items-center space-x-2'>
                <span>{review.comment}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        {reviews.length === 0 || reviews.length < 5 ? (
          <></>
        ) : (
          <ModalListReview courseId={courseId} />
        )}
      </div>
    </div>
  );
};

export default Reviews;
