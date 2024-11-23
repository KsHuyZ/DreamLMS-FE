import Image from 'next/image';
import React from 'react';

const IntroduceSection = () => {
  return (
    <section className='container'>
      <div className='grid grid-cols-1 gap-1 gap-y-2 lg:grid-cols-2 lg:gap-2'>
        <div className='flex flex-col space-y-6'>
          <div className='flex flex-col space-y-6 py-5 max-w-[700px]'>
            <p className='font-bold text-xl text-primary-800'>What's New</p>
            <h1 className='text-tertiary-800'>
              Master the skills to drive your career
            </h1>
            <p className='text-tertiary-600 font-bold'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque. Suspendisse imperdiet.
            </p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            <div className='border rounded-xl p-4 grid grid-cols-2 items-center hover:-translate-y-3 transition-transform duration-300'>
              <Image src='/images/book.svg' width={67} height={67} alt='book' />
              <div>
                <p className='text-tertiary-600 font-bold'>
                  ContentStay motivated with engaging instructors
                </p>
              </div>
            </div>
            <div className='border rounded-xl p-4 grid grid-cols-2 items-center hover:-translate-y-3 transition-transform duration-300'>
              <Image
                src='/images/learn.svg'
                width={67}
                height={67}
                alt='book'
              />
              <div>
                <p className='text-tertiary-600 font-bold'>
                  Keep up with in the latest in cloud
                </p>
              </div>
            </div>
            <div className='border rounded-xl p-4 grid grid-cols-2 items-center hover:-translate-y-3 transition-transform duration-300'>
              <Image
                src='/images/cloud.svg'
                width={67}
                height={67}
                alt='book'
              />
              <div>
                <p className='text-tertiary-600 font-bold'>
                  Get certified with 100+ certification courses
                </p>
              </div>
            </div>
            <div className='border rounded-xl p-4 grid grid-cols-2 items-center hover:-translate-y-3 transition-transform duration-300'>
              <Image
                src='/images/certificate-landing.svg'
                width={67}
                height={67}
                alt='book'
              />
              <div>
                <p className='text-tertiary-600 font-bold'>
                  Build skills your way, from labs to courses
                </p>
              </div>
            </div>
          </div>
        </div>
        <Image src='/images/join.png' alt='join' width={872} height={842} />
      </div>
    </section>
  );
};

export default IntroduceSection;
