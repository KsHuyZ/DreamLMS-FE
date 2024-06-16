import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

const PermissionDenied = () => {
  return (
    <section className='bg-white dark:bg-gray-900 w-full flex justify-center'>
      <div className=''>
        <div className='flex flex-col items-center justify-center max-w-screen-sm text-center'>
          <NextImage
            src='/images/404-computer.svg'
            width={300}
            height={300}
            alt='not found'
            layout='none'
          />
          <span className='mb-4 text-sm tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
            403
          </span>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            You don't have permission for this page
          </p>
          <Link
            href='/courses'
            className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
          >
            Back to Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PermissionDenied;
