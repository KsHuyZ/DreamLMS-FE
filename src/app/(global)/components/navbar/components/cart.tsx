import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import { useRemoveCartItem, useUserCart } from '@/app/(global)/_hooks';
import { formatPrice } from '@/utils';

const Cart = () => {
  const { data: cart, isLoading } = useUserCart();
  const { mutateAsync: removeCart } = useRemoveCartItem();

  const cartItems = cart?.cartItems || [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='relative inline-flex'>
          <ShoppingCart className='cursor-pointer text-gray-500' />
          {cartItems.length > 0 ? (
            <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-3 min-h-3">
              {cartItems.length}
            </span>
          ) : null}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='border-b pb-6 border-dashed'>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col space-y-8 items-center my-6 w-full h-full'>
          <div className='flex flex-col space-y-4 justify-center items-center w-full'>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <Skeleton className='h-14 w-14 rounded-sm' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                </div>
              ))
            ) : cartItems.length === 0 ? (
              <div className='flex flex-col space-y-4 items-center'>
                <Image
                  src='/images/empty.svg'
                  width={100}
                  height={100}
                  alt='Empty image'
                  className='rounded-md overflow-hidden'
                />
                <Label>You don't have any course in cart</Label>
              </div>
            ) : (
              <div className='max-h-[500px] overflow-scroll no-scrollbar grid grid-cols-1 divide-y w-full'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center w-full justify-between hover:bg-gray-100 cursor-pointer duration-200 p-2 rounded-sm'
                  >
                    <div className='flex items-center space-x-2'>
                      <Image
                        src={item.course.image.url}
                        width={100}
                        height={100}
                        alt='COurse img'
                        className='rounded-md overflow-hidden'
                      />
                      <div className='flex flex-col space-y-2'>
                        <Label className='line-clamp-1 font-bold'>
                          {item.course.name}
                        </Label>
                        <span className='text-sm text-muted-foreground'>
                          {item.course.createdBy.firstName}{' '}
                          {item.course.createdBy.lastName}
                        </span>
                      </div>
                    </div>
                    <Button variant='ghost' onClick={() => removeCart(item.id)}>
                      <X size={15} className='text-gray-500' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='absolute mx-8 my-4 inset-x-0 bottom-0 outline-none'>
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-2 items-center justify-between'>
              <Label>Total:</Label>
              <span className='text-2xl text-bold'>
                {cartItems.length > 0
                  ? formatPrice(
                      cartItems.reduce(
                        (current, cartItem) => cartItem.course.price + current,
                        0
                      )
                    )
                  : '0$'}
              </span>
            </div>
            <Link href='/cart'>
              <Button className='w-full'>See detail</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
