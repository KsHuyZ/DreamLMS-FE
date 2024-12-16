'use client';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { EPlan, Path, TPlan } from '@/constant';
import { useUpgradePlan } from '@/features/teacher/features/storage/components/plan-card/hooks';

interface Props {
  plan: TPlan;
}

const PlanCard: React.FC<Props> = ({ plan }) => {
  const { demand, label, price, type, size } = plan;
  const { mutateAsync: upgradePlan, isPending } = useUpgradePlan();
  const router = useRouter();
  const onSelectPlan = useCallback(async () => {
    const { client_secret } = await upgradePlan(type);
    router.push(Path.UpgradePlan(client_secret));
  }, [router, type, upgradePlan]);

  return (
    <Card className='w-[350px] h-[400px] shadow-md border-primary-600 border-2'>
      <CardContent className='flex flex-col justify-between items-center h-full'>
        <div className='flex flex-col space-y-2'>
          <div className='grid grid-cols-1 gap-8 justify-center items-center'>
            <div className='flex justify-center items-center flex-col space-y-4 text-center'>
              <Label className='font-bold text-lg'>{label}</Label>
              <p>{demand}</p>
            </div>
            <div className='flex flex-col space-y-4 text-center'>
              <Label>
                Starting at <span className='text-2xl font-bold'>${price}</span>
              </Label>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col space-y-2 pt-5'>
            <div className='flex items-center space-x-2'>
              <Check className='w-4 h-4 text-primary-600' />
              <Label>Permanently uses {size}GB of space</Label>
            </div>
          </div>
        </div>
        <Button isLoading={isPending} onClick={onSelectPlan}>
          Choose{' '}
          {type === EPlan.STANDARD
            ? 'Standard'
            : type === EPlan.ADVANCED
            ? 'Advanced'
            : 'Premium'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
