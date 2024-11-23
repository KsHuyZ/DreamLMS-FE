import Image from 'next/image';
import React from 'react';

import CountUpInfo from '@/features/landing/components/blog-section/components/count-up';

const listCourses = [
  'world.svg',
  'kubernet.svg',
  'icon-16.svg',
  'icon-12.svg',
  'icon-13.svg',
  'icon-14.svg',
  'icon-15.svg',
  'icon-16.svg',
  'icon-17.svg',
  'icon-18.svg',
];

const BlogSection = () => {
  return (
    <section className='bg-[url(/images/bg-banner-02.png)] py-10'>
      <div className='px-5 xl:px-0 xl:container'>
        <div className='flex flex-col space-y-12'>
          <div className='flex flex-col space-y-8 items-center'>
            <h1 className='text-tertiary-800 font-bold text-center'>
              Latest Blogs
            </h1>
            <p className='text-tertiary-600 font-bold text-center max-w-[700px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque. Suspendisse imperdiet.
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
              <div className='flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
                <Image
                  src='/images/spider.jpg'
                  width={300}
                  height={200}
                  alt='spider'
                />
                <div className='flex flex-col space-y-3 p-4 text-center'>
                  <h4 className='text-tertiary-800'>
                    Complete PHP Programming Career
                  </h4>
                  <p className='text-tertiary-600'>Business</p>
                  <p className='text-tertiary-600'>January 12, 2024</p>
                </div>
              </div>
              <div className='flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
                <Image
                  src='/images/spider.jpg'
                  width={300}
                  height={200}
                  alt='spider'
                />
                <div className='flex flex-col space-y-3 p-4 text-center'>
                  <h4 className='text-tertiary-800'>
                    Complete PHP Programming Career
                  </h4>
                  <p className='text-tertiary-600'>Business</p>
                  <p className='text-tertiary-600'>January 12, 2024</p>
                </div>
              </div>
              <div className='flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
                <Image
                  src='/images/spider.jpg'
                  width={300}
                  height={200}
                  alt='spider'
                />
                <div className='flex flex-col space-y-3 p-4 text-center'>
                  <h4 className='text-tertiary-800'>
                    Complete PHP Programming Career
                  </h4>
                  <p className='text-tertiary-600'>Business</p>
                  <p className='text-tertiary-600'>January 12, 2024</p>
                </div>
              </div>
              <div className='flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
                <Image
                  src='/images/spider.jpg'
                  width={300}
                  height={200}
                  alt='spider'
                />
                <div className='flex flex-col space-y-3 p-4 text-center'>
                  <h4 className='text-tertiary-800'>
                    Complete PHP Programming Career
                  </h4>
                  <p className='text-tertiary-600'>Business</p>
                  <p className='text-tertiary-600'>January 12, 2024</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg,rgba(161,196,253,0.79) 0%,rgba(194,233,251,0.36) 100%)',
            }}
            className='p-7 rounded-2xl grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-3'
          >
            <CountUpInfo
              quantity={1452}
              content='Student Enrolled'
              src='/images/user.svg'
            />
            <CountUpInfo
              quantity={252}
              content='Total Courses'
              src='/images/note-book.svg'
            />
            <CountUpInfo
              quantity={13}
              content='Countries'
              src='/images/world.svg'
            />
          </div>
          <div className='flex flex-col justify-center items-center space-y-4'>
            <h1 className='text-tertiary-800 text-center max-w-[632px] font-bold'>
              Unlimited access to 360+ courses and 1,600+ hands-on labs
            </h1>
            <div className='grid grid-cols-4 gap-4 lg:grid-cols-10 items-center lg:gap-10 container'>
              {listCourses.map((course) => (
                <div
                  className='bg-white p-3 rounded-md hover:-translate-y-3 duration-150 cursor-pointer'
                  key={course}
                >
                  <Image
                    src={`/images/${course}`}
                    width={45}
                    height={45}
                    alt=''
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
