'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

const CoursePayment = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();
  useEffect(() => {
    if (timeLeft <= 0) return router.push('/learning');
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  return (
    <div className='p-6 pt-0 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-tertiary-800 md:text-2xl '>
        Thank you for pay for this course
      </h1>
      <div className='flex items-center justify-center'>
        <div className='absolute w-5 h-5 rounded-full bg-primary-600 opacity-50 animate-ripple z-10'></div>
        <FaCircleCheck className='w-10 h-10 text-primary-600 z-30 rounded-full bg-white' />
      </div>
      <div className='flex items-center justify-center'>
        <p className='text-tertiary-800 text-center font-bold'>
          You will be redirect now to learning page in {timeLeft}s
        </p>
      </div>
    </div>
  );
};

export default CoursePayment;
