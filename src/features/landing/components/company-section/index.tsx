'use client';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CompanySection = () => {
  return (
    <section className='container space-y-8'>
      <p className='text-xl text-center font-bold text-primary-600'>
        Trusted By
      </p>
      <h1 className='font-bold text-center text-tertiary-800'>
        500+ Leading Universities And Companies
      </h1>
      <Carousel
        responsive={responsive}
        ssr
        arrows={false}
        autoPlaySpeed={2000}
        autoPlay
        infinite
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Image
            key={index}
            src={`/images/lead-0${index + 1}.png`}
            width={133}
            height={26}
            alt='carousel'
          />
        ))}
      </Carousel>
    </section>
  );
};

export default CompanySection;
