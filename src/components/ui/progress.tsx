'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    color?: string;
  }
>(({ className, value, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-slate-100 ',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        color ?? 'bg-primary-600',
        'h-full w-full flex-1 transition-all '
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-20 w-20 overflow-hidden rounded-full bg-primary/20 flex justify-center items-center`,
      className
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(green ${
        value || 0
      }%, pink 0)`,
    }}
  >
    <div className=''>{`${value || 0}%`}</div>
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { CircleProgress, Progress };
