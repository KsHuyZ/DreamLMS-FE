'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

import { formatPrice } from '@/utils';

import { TCartItem } from '@/types';

interface TableCartProps {
  data?: TCartItem[];
  isLoading: boolean;
}

const TableCart = ({ data, isLoading }: TableCartProps) => {
  return (
    <>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index} className='grid-cols-6 gap-2 items-center'>
            <TableCell className='font-medium col-span-4'>
              <div className='flex items-center justify-between cursor-pointer duration-200 p-2 rounded-sm'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='w-40 h-20' />
                  <div className='flex flex-col space-y-2'>
                    <Skeleton className='w-40 h-4' />
                    <div className='flex items-center space-x-2'>
                      <span>Author:</span>
                      <Skeleton className='w-20 h-4' />
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className='w-20 h-4' />
            </TableCell>
            <TableCell>
              <Button variant='ghost'>
                <X size={15} className='text-gray-500' />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : data && data.length > 0 ? (
        data.map((cartItem) => (
          <TableRow
            key={cartItem.id}
            className='grid-cols-6 gap-2 items-center'
          >
            <TableCell className='font-medium col-span-4'>
              <div className='flex items-center justify-between cursor-pointer duration-200 p-2 rounded-sm'>
                <div className='flex items-center space-x-2'>
                  <Image
                    src={cartItem.course.image.url}
                    width={100}
                    height={100}
                    alt='COurse img'
                    className='rounded-md overflow-hidden'
                  />
                  <div className='flex flex-col space-y-2'>
                    <Label>{cartItem.course.name}</Label>
                    <div className='flex items-center space-x-2'>
                      <span>Author:</span>
                      <span className='text-sm'>
                        {cartItem.course.createdBy.firstName}{' '}
                        {cartItem.course.createdBy.lastName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{formatPrice(cartItem.course.price)}</TableCell>
            <TableCell>
              <Button variant='ghost'>
                <X size={15} className='text-gray-500' />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={12} className='w-full h-full text-center'>
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
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableCart;
