'use client';
import React, { useCallback, useState } from 'react';

import PaymentFailure from '@/components/payments/components/payment-failure';
import StripePaymentForm from '@/components/payments/stripe-payment-form';
import StripePaymentsElementProvider from '@/components/payments/stripe-payment-provider';

import { TUser } from '@/types';

export type PaymentProps = {
  authUser: TUser;
};

export enum PaymentSteps {
  PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
}

export type FailureReason = {
  message: string;
  description?: string;
};

const PaymentSideBarProps: Record<
  PaymentSteps,
  { title: string; subTitle: string }
> = {
  [PaymentSteps.PAYMENT]: {
    title: 'Payment',
    subTitle: 'Please enter your payment details to continue',
  },
  [PaymentSteps.PAYMENT_SUCCESS]: {
    title: 'Payment',
    subTitle: 'Your payment was successful',
  },
  [PaymentSteps.PAYMENT_FAILURE]: {
    title: 'Payment',
    subTitle: 'Oops, something went wrong',
  },
};

const Payment: React.FC<PaymentProps> = () => {
  const [paymentStep, setPaymentStep] = useState(PaymentSteps.PAYMENT);
  const [failureReason, setFailureReason] = useState<
    FailureReason | undefined
  >();

  const onRetry = useCallback(() => {
    setPaymentStep(PaymentSteps.PAYMENT);
    setFailureReason(undefined);
  }, []);

  return (
    <>
      {paymentStep === PaymentSteps.PAYMENT && (
        <StripePaymentsElementProvider>
          <StripePaymentForm
            onFailure={(message, description) => {
              setPaymentStep(PaymentSteps.PAYMENT_FAILURE);
              setFailureReason({
                message,
                description,
              });
            }}
          />
        </StripePaymentsElementProvider>
      )}
      {paymentStep === PaymentSteps.PAYMENT_FAILURE && failureReason && (
        <PaymentFailure onRetry={onRetry} failureReason={failureReason} />
      )}
    </>
  );
};

export default Payment;
