import Image from 'next/image';
import React from 'react';

import { FailureReason } from '@/components/payments';
import { Button } from '@/components/ui/button';

export type PaymentFailureProps = {
  onRetry: () => void;
  failureReason: FailureReason;
};

const PaymentFailure: React.FC<PaymentFailureProps> = ({
  onRetry,
  failureReason,
}) => (
  <div className='m-auto flex min-h-full flex-col justify-center'>
    <div className=' flex flex-col items-center justify-center'>
      <Image
        src='/assets/images/symbols/payment_failed.svg'
        height='180'
        width='180'
        alt='Expired Link'
        className='mb-6'
        data-test='circular-checkmark-icon'
      />
      <h5
        className='mb-3 text-center text-2xl font-semibold text-on-surface-primary'
        data-test='failure-heading'
      >
        {failureReason.message}
      </h5>
      <p
        className='mb-3 text-center text-base font-normal text-on-surface-variant'
        data-test='success-content'
      >
        {failureReason.description ??
          `Something went wrong and we couldn't complete your request. Please try again and If the problem persists please contact us.`}
      </p>
    </div>
    <div className='mt-5 flex flex-col gap-4'>
      <Button type='button' onClick={() => onRetry()}>
        Retry Payment
      </Button>
      <Button type='button'>Contact Customer Services</Button>
    </div>
  </div>
);

export default PaymentFailure;
