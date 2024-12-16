import React from 'react';

import { plans } from '@/constant';
import PlanCard from '@/features/teacher/features/storage/components/plan-card';

const Storage = () => {
  return (
    <div className='flex items-center space-x-4 p-4 bg-[url(/images/banner.png)] h-full'>
      {plans.map((plan) => (
        <PlanCard key={plan.type} plan={plan} />
      ))}
    </div>
  );
};

export default Storage;
