'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';

interface CardStatsProps {
  src: string;
  quantity: number;
  description: string;
  charAttach: string;
}

const CardStats = ({
  src,
  quantity,
  description,
  charAttach,
}: CardStatsProps) => {
  return (
    <div className='p-6 rounded-xl flex items-center space-x-4 border-inherit border bg-white hover:-translate-y-3 transition-transform duration-300 cursor-pointer'>
      <Image src={src} width={81} height={81} alt='image' />
      <div className='flex flex-col space-y-2'>
        <CountUp delay={0} end={quantity} duration={5}>
          {({ countUpRef }) => (
            <div>
              <span
                className='text-tertiary-800 text-4xl font-extrabold'
                ref={countUpRef}
              >
                0
              </span>
              <span className='text-tertiary-800 text-4xl font-extrabold'>
                {charAttach}
              </span>
            </div>
          )}
        </CountUp>
        <span className='text-tertiary-600'>{description}</span>
      </div>
    </div>
  );
};

export default CardStats;
