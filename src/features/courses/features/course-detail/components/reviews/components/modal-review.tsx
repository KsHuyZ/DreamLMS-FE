'use client';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, useState } from 'react';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { useCreateReview } from '@/features/courses/features/course-detail/components/reviews/hooks';

interface Props {
  courseId: string;
  // refetch: () => void;
}

const ModalReview: React.FC<Props> = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number>();
  const [rating, setRating] = useState<number>(0);
  const { mutateAsync: createVideo, isPending } = useCreateReview();
  const [comment, setComment] = useState('');
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
    setRating(0);
  };

  const onSubmit = async () => {
    await createVideo({
      comment,
      star: rating,
      courseId,
    });
    router.refresh();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <button
        className='text-primary-600 text-sm'
        onClick={() => setOpen(true)}
      >
        Add your review
      </button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Overall Rating</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-center space-x-2 mt-5'>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <button
                key={item}
                className='text-primary-600'
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(undefined)}
                onClick={() => setRating(item)}
              >
                <Star
                  className='text-yellow-300 w-10 h-10'
                  fill={
                    (hoverIndex !== undefined && index <= (hoverIndex ?? -1)) ||
                    index <= rating - 1
                      ? '#fde047'
                      : 'none'
                  }
                />
              </button>
            ))}
          </div>
          <div className='flex flex-col space-y-1'>
            <Label>Review title</Label>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Enter your review'
              className='rounded-md'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            isLoading={isPending}
            className='rounded-md'
            onClick={onSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ModalReview);
