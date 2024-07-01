'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { useBuyCart } from '@/app/(global)/cart/_hooks';

const Payment = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useBuyCart();

  const handlePayment = async () => {
    const result = await mutateAsync();
    location.replace(result.redirect_url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className='w-full' onClick={handlePayment} isLoading={isPending}>
        Pay now
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select payment method</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center space-x-8 relative'>
          <div
            className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'
            onClick={handlePayment}
          >
            <Image
              src='/images/vnpay.webp'
              width={70}
              height={70}
              alt='vnpay'
            />
            <Label className='font-bold'>VNPay</Label>
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

export default Payment;
