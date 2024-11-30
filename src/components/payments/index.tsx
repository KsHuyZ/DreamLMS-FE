'use client';
import React, { useCallback, useState } from 'react';

import PaymentFailure from '@/components/payments/components/payment-failure';
import StripePaymentForm from '@/components/payments/stripe-payment-form';
import StripePaymentsElementProvider from '@/components/payments/stripe-payment-provider';

export enum PaymentSteps {
  PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
}

export type FailureReason = {
  message: string;
  description?: string;
};

const Payment = () => {
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
