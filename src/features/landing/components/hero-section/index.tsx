import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import CardStats from '@/features/landing/components/hero-section/components/card-stats';
import CountUpUser from '@/features/landing/components/hero-section/components/count-up';
import SearchBar from '@/features/landing/components/hero-section/components/search-bar';

const HeroSection = () => {
  return (
    <div>
      <section className='bg-[url(/images/banner.png)] w-full min-h-[500px] pb-36 bg-cover bg-no-repeat bg-center'>
        <div className='px-5 xl:px-0 xl:container'>
          <div className='grid lg:grid-cols-3 grid-cols-1 pt-48 lg:gap-3 gap-1'>
            <div className='flex flex-col space-y-8 lg:col-span-2 col-span-1'>
              <h5 className='text-tertiary-600 text-xl font-bold'>
                The Leader in Online Learning
              </h5>
              <h1 className='text-tertiary-800 lg:text-5xl font-extrabold max-w-[394px] lg:max-w-[500px]'>
                Engaging & Accessible Online Courses For All
              </h1>
              <SearchBar />
              <h5 className='text-tertiary-600 text-xl font-bold'>
                Trusted by over 1K Users <br />
                worldwide since 2025
              </h5>
              <div className='flex items-center space-x-10'>
                <CountUpUser />

                <div className='flex items-center space-x-4'>
                  <h1 className='text-tertiary-800 text-4xl lg:text-5xl font-extrabold'>
                    4.5
                  </h1>
                  <div className='flex items-center space-x-3'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className='text-yellow-300 w-5 h-5'
                        fill='#fde047'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Image
              src='/images/object.png'
              alt='obj'
              width={380}
              height={380}
            />
          </div>
        </div>
      </section>

      <section className='px-5 xl:px-0 xl:container lg:-mt-14 mt-4'>
        <div className='grid grid-cols-1 gap-1 gap-y-4 lg:grid-cols-4 lg:gap-4'>
          <CardStats
            src='/images/pen-rule.svg'
            quantity={10}
            description='Online Courses'
            charAttach='K'
          />
          <CardStats
            src='/images/expert.svg'
            quantity={186}
            description='Expert Tutors'
            charAttach='+'
          />
          <CardStats
            src='/images/certificate.svg'
            quantity={5}
            description='Certificated Courses'
            charAttach='+'
          />
          <CardStats
            src='/images/students.svg'
            quantity={55}
            description='Online Student'
            charAttach='+'
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
