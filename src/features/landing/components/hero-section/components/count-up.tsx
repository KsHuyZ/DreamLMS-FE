'use client';
import React from 'react';
import CountUp from 'react-countup';
const CountUpUser = () => {
  return (
    <CountUp start={0} end={290} duration={5} delay={0}>
      {({ countUpRef }) => (
        <div>
          <span
            className='text-tertiary-800 text-4xl lg:text-5xl font-extrabold'
            ref={countUpRef}
          >
            0
          </span>
          <span className='text-tertiary-800 text-4xl lg:text-5xl font-extrabold'>
            +
          </span>
        </div>
      )}
    </CountUp>
  );
};

export default CountUpUser;
