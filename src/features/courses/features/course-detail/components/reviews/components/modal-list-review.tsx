'use client';
import { useVirtualizer } from '@tanstack/react-virtual';
import { formatDistanceToNow } from 'date-fns';
import { EllipsisVertical, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { useReviews } from '@/features/courses/features/course-detail/components/reviews/hooks';

interface Props {
  courseId: string;
}

const ModalListReview: React.FC<Props> = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [selectStars, setSelectStar] = useState([1, 2, 3, 4, 5]);
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useReviews(courseId, 10, selectStars);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const reviewPagination = data?.pages[0];

  const rowVirtualizer = useVirtualizer({
    count: reviewPagination?.total || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
    overscan: 20,
  });

  const handleScroll = useCallback(() => {
    if (!parentRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = parentRef.current || {};
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const scrollElement = parentRef.current;
    scrollElement?.addEventListener('scroll', handleScroll);
    return () => scrollElement?.removeEventListener('scroll', handleScroll);
  }, [handleScroll, hasNextPage, isFetchingNextPage]);

  const onSelectStar = (star: number) => {
    if (selectStars.includes(star)) {
      setSelectStar(selectStars.filter((item) => item !== star));
    } else {
      setSelectStar([...selectStars, star]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className='rounded-md' onClick={() => setOpen(true)}>
        See all
      </Button>
      <DialogContent className='min-w-[1000px]'>
        <DialogHeader>
          {isLoading ? (
            <Skeleton className='w-20 h-4' />
          ) : (
            <DialogTitle className='flex items-center space-x-2'>
              <Star className='w-7 h-7 text-yellow-300' fill='#fde047' />{' '}
              <p>
                {reviewPagination?.avgRate} star {reviewPagination?.total} rates
              </p>
            </DialogTitle>
          )}
        </DialogHeader>
        <div className='grid grid-cols-6 gap-6 divide-x'>
          <div className='col-span-2 space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-center space-x-4'>
                <Checkbox
                  className='w-4 h-4'
                  checked={selectStars.includes(5)}
                  onCheckedChange={() => onSelectStar(5)}
                />
                <Progress value={50} className='h-2' />
                <div className='flex items-center space-x-1'>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      fill='#fde047'
                      className='text-yellow-300 w-4 h-4'
                    />
                  ))}
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Checkbox
                  className='w-4 h-4'
                  checked={selectStars.includes(4)}
                  onCheckedChange={() => onSelectStar(4)}
                />
                <Progress value={50} className='h-2' />
                <div className='flex items-center space-x-1'>
                  {[1, 2, 3, 4].map((item) => (
                    <Star
                      key={item}
                      fill='#fde047'
                      className='text-yellow-300 w-4 h-4'
                    />
                  ))}
                  <Star className='text-yellow-300 w-4 h-4' />
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Checkbox
                  className='w-4 h-4'
                  checked={selectStars.includes(3)}
                  onCheckedChange={() => onSelectStar(3)}
                />
                <Progress value={50} className='h-2' />
                <div className='flex items-center space-x-1'>
                  {[1, 2, 3].map((item) => (
                    <Star
                      key={item}
                      fill='#fde047'
                      className='text-yellow-300 w-4 h-4'
                    />
                  ))}
                  {[1, 2].map((item) => (
                    <Star key={item} className='text-yellow-300 w-4 h-4' />
                  ))}
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Checkbox
                  className='w-4 h-4'
                  checked={selectStars.includes(2)}
                  onCheckedChange={() => onSelectStar(2)}
                />
                <Progress value={50} className='h-2' />
                <div className='flex items-center space-x-1'>
                  {[1, 2].map((item) => (
                    <Star
                      key={item}
                      fill='#fde047'
                      className='text-yellow-300 w-4 h-4'
                    />
                  ))}
                  {[1, 2, 3].map((item) => (
                    <Star key={item} className='text-yellow-300 w-4 h-4' />
                  ))}
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Checkbox
                  className='w-4 h-4'
                  checked={selectStars.includes(1)}
                  onCheckedChange={() => onSelectStar(1)}
                />
                <Progress value={50} className='h-2' />
                <div className='flex items-center space-x-1'>
                  <Star fill='#fde047' className='text-yellow-300 w-4 h-4' />
                  {[1, 2, 3, 4].map((item) => (
                    <Star key={item} className='text-yellow-300 w-4 h-4' />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className='grid grid-cols-1 gap-2 col-span-4 divide-y divide-primary-600 overflow-y-auto h-[calc(100vh-100px)]'
            ref={parentRef}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {isLoading ? (
                [1, 2, 3, 4].map((item) => (
                  <Card className='shadow-md' key={item}>
                    <CardContent className='flex flex-col space-y-4'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col space-y-2'>
                          <div className='flex items-center space-x-2'>
                            <Skeleton className='rounded-full w-10 h-10' />
                            <div className='flex flex-col space-y-2'>
                              <Skeleton className='w-20 h-4' />
                              <div className='text-muted-foreground text-sm p-0 m-0 flex items-center space-x-1'>
                                <Skeleton className='w-16 h-2' />
                                <div className='flex items-center space-x-1'>
                                  <Skeleton className='w-16 h-2' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button>
                          <EllipsisVertical className='w-4 h-4' />
                        </button>
                      </div>
                      <div className='space-y-2'>
                        <Skeleton className='w-44 h-4' />
                        <Skeleton className='w-32 h-2' />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : !rowVirtualizer.getVirtualItems().length ? (
                <div className='flex flex-col space-y-4 items-center'>
                  <Image
                    src='/images/empty.svg'
                    width={150}
                    height={150}
                    alt='empty'
                  />
                  <Label>
                    It's look like this course don't have any review
                  </Label>
                </div>
              ) : (
                rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const review = reviewPagination?.data[virtualRow.index];
                  return (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <Card className='border-none h-fit' key={review?.id}>
                        <CardContent className='flex flex-col space-y-4'>
                          <div className='flex justify-between'>
                            <div className='flex flex-col space-y-2'>
                              <div className='flex items-center space-x-2'>
                                <Image
                                  src={
                                    review?.user.photo?.url ||
                                    '/images/avatar.jpg'
                                  }
                                  width={40}
                                  height={40}
                                  alt='avatar'
                                  className='rounded-full'
                                />
                                <div className='flex flex-col'>
                                  <span className='font-bold p-0 m-0'>
                                    {review?.user.firstName}{' '}
                                    {review?.user.lastName}
                                  </span>
                                  <div className='text-muted-foreground text-sm p-0 m-0 space-y-1'>
                                    <span>
                                      {formatDistanceToNow(
                                        review?.createdAt || 0
                                      )}
                                    </span>{' '}
                                    <div className='flex items-center space-x-1'>
                                      {Array.from({
                                        length: review?.star || 5,
                                      }).map((_, index) => (
                                        <Star
                                          key={index}
                                          className='text-yellow-300 w-4 h-4'
                                          fill='#fde047'
                                        />
                                      ))}
                                      {Array.from({
                                        length: 5 - (review?.star ?? 0),
                                      }).map((_, index) => (
                                        <Star
                                          key={index}
                                          className='text-yellow-300 w-4 h-4'
                                        />
                                      ))}
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
                            <span>{review?.comment}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalListReview;
