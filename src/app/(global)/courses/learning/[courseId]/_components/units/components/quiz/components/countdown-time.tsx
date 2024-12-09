'use client';

import { addSeconds, format, startOfDay } from 'date-fns';
import React, { memo, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ICountDownTimeProps {
  totalSeconds: number;
}

const CountDownTime = ({ totalSeconds }: ICountDownTimeProps) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const result = addSeconds(startOfDay(new Date()), timeLeft);

  return (
    <span
      className={cn(
        'text-xl font-bold p-0 mt-0',
        timeLeft < 3568 ? 'text-red-600' : ''
      )}
    >
      {format(result, 'HH:mm:ss')}
    </span>
  );
};

export default memo(CountDownTime);
