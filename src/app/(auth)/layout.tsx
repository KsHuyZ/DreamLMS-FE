import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='rounded overflow-hidden'>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col w-full lg:w-1/2 justify-center px-6 py-8 md:h-screen lg:py-0'>
          <Link
            href='#'
            className='flex justify-center lg:justify-start items-center text-2xl font-bold text-gray-900 '
          >
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={144}
              height={144}
              priority
            />
          </Link>
          <div className='flex justify-center items-center'>
            <div className='w-full md:mt-0 sm:max-w-md xl:p-0 '>{children}</div>
          </div>
        </div>
        <div className="w-1/2 h-screen hidden lg:block bg-[url('/images/login-bg.png')] rounded-lg overflow-hidden">
          <div className='flex flex-col items-center justify-center h-full'>
            <Image
              src='/images/illustration_dashboard.png'
              alt='Placeholder Image'
              className='object-cover'
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
