import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

export type StripePaymentsElementProviderProps = {
  children: React.ReactNode;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''
);

const StripePaymentsElementProvider: React.FunctionComponent<
  StripePaymentsElementProviderProps
> = ({ children }) => {
  const searchParams = useSearchParams();

  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret: searchParams.get('clientSecret') as string,
      appearance: {
        variables: {
          fontFamily: 'Nunito, sans-serif',
          fontSizeBase: '14px',
          fontSizeSm: '14px',
          fontSizeLg: '14px',
          fontSizeXl: '14px',
          colorPrimary: '#00bdff',
          colorBackground: '#f9fafb',
          colorTextPlaceholder: '#9CA3AF',
          borderRadius: '8px',
          focusBoxShadow: 'none',
          spacingGridRow: '30px',
        },
        rules: {
          '.Input': {
            boxShadow: 'none',
            border: '1px solid #d1d5db',
            transition: '0.25s',
          },
          '.Input:focus': {
            boxShadow: 'none',
            outline: '#FF7565 auto 2px',
          },
          '.Error': {
            margin: '5px 0',
          },
        },
      },
      locale: 'en',
    }),
    [searchParams]
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripePaymentsElementProvider;
