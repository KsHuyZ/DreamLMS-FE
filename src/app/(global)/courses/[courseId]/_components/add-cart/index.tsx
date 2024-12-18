'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useAddCart } from '@/app/(global)/courses/[courseId]/_components/add-cart/hooks';

const AddCart = ({ id }: { id: string }) => {
  const { mutateAsync, isPending } = useAddCart();
  const router = useRouter();

  const addToCart = () => {
    mutateAsync(id);
    router.refresh();
  };
  return (
    <Button isLoading={isPending} onClick={addToCart}>
      Add to cart
    </Button>
  );
};

export default AddCart;
