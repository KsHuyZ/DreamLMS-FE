'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useState } from 'react';

import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { usePayCourse } from '@/features/courses/features/course-detail/components/payment/hooks';
interface IPaymentProps {
  courseId: string;
}

const PayMent = ({ courseId }: IPaymentProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: payMent, isPending } = usePayCourse(courseId);
  const router = useRouter();
  const handlePayment = useCallback(async () => {
    const result = await payMent();
    router.push(
      `/enroll/payments/${courseId}?clientSecret=${result.client_secret}`
    );
  }, [courseId, payMent, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant='outline' onClick={() => setOpen(true)}>
        Buy now
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select payment method</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center space-x-8 relative'>
          {isPending && (
            <div className='absolute w-full h-full bg-background/90 backdrop-blur-sm duration-200 flex justify-center items-center'>
              <div className='flex flex-col space-y-4 items-center'>
                <Spinner />
                <Label>Please wait...</Label>
              </div>
            </div>
          )}
          <div
            className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'
            onClick={handlePayment}
          >
            <Image
              src='/images/stripe.png'
              width={70}
              height={70}
              alt='stripe'
              className='rounded-md'
            />
            <Label className='font-bold'>Stripe</Label>
          </div>
          <div className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'>
            <Image
              src='/images/metamask.png'
              width={70}
              height={70}
              alt='metamask'
            />
            <Label className='font-bold'>Metamask</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PayMent);
