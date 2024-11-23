'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
interface CountUpInfoProps {
  quantity: number;
  src: string;
  content: string;
}
const CountUpInfo = ({ quantity, src }: CountUpInfoProps) => {
  return (
    <div className='flex items-center space-x-3'>
      <div className='p-3 rounded-md bg-white'>
        <Image src={src} width={80} height={80} alt='' />
      </div>
      <div className='flex flex-col space-y-3'>
        <CountUp start={0} end={quantity} duration={5}>
          {({ countUpRef }) => (
            <span
              className='text-tertiary-800 text-5xl font-extrabold'
              ref={countUpRef}
            >
              0
            </span>
          )}
        </CountUp>
        <p className='text-tertiary-600 text-xl'>Students Enrolled</p>
      </div>
    </div>
  );
};

export default CountUpInfo;
