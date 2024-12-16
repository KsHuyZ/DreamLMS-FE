import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { Path, QueryKey } from '@/constant';
import { toTitleCase } from '@/utils';

import { EPayment } from '@/types';

export type StripePaymentFormProps = {
  onFailure: (message: string, description?: string) => void;
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ onFailure }) => {
  const [submitting, setSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { toast } = useToast();
  const { courseId } = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const handleError = (error: StripeError) => {
    setSubmitting(false);

    if (
      (error.type === 'card_error' || error.type === 'validation_error') &&
      error.message
    ) {
      onFailure(toTitleCase(error.message).slice(0, -1));
    } else if (error.type === 'invalid_request_error') {
      if (error.code === 'payment_intent_unexpected_state') {
        onFailure(
          error.message
            ? toTitleCase(error.message).slice(0, -1)
            : 'A processing error occured',
          'Payment failed due to multiple unsuccessful attempts. Please try again in 24 hours and If the problem persists please contact us.'
        );
      } else {
        toast({ variant: 'destructive', title: error.message });
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (!stripe || !elements) {
      setSubmitting(false);
      return;
    }

    (async () => {
      try {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/account-settings`,
          },
          redirect: 'if_required',
        });

        if (result.error) {
          handleError(result.error);
        } else if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          if (searchParams.get('type') === EPayment.UpgradePlans) {
            router.replace(Path.Storage);
            setTimeout(
              () => queryClient.invalidateQueries({ queryKey: [QueryKey.Me] }),
              2000
            );
          } else {
            router.replace(Path.PaymentSuccess(courseId as string));
          }
        }
      } catch (error) {
        console.error('Error in payment confirmation:', error);
      }
      setSubmitting(false);
    })();
  };

  const onGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div>
      <div className='mb-2 flex items-center justify-between gap-3'>
        <h3 className='text-2xl text-tertiary-800'>Payment Details</h3>
      </div>
      <div className='mt-2'>
        <p className='mb-6 text-base text-on-surface-variant'>
          Please enter your card details to continue. This is a one-time payment
        </p>
      </div>
      <form onSubmit={handleSubmit} className='relative'>
        <PaymentElement
          options={{
            wallets: {
              applePay: 'auto',
              googlePay: 'auto',
            },
          }}
          onChange={(event) => {
            if (event.complete) {
              setIsComplete(true);
            } else {
              setIsComplete(false);
            }
          }}
        />
        <div className='mt-8 flex md:mt-10 justify-between w-full'>
          <Button onClick={onGoBack} variant='outline'>
            Previous
          </Button>
          <Button
            type='submit'
            isLoading={submitting}
            disabled={!stripe || submitting || !isComplete}
          >
            Pay Now
          </Button>
        </div>
        <div className='mt-4 flex flex-col items-center'>
          <Image
            src='/images/stripeBanner.svg'
            width={150}
            height={34}
            alt='stripe'
          />
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;
