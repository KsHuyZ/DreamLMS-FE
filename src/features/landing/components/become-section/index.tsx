import Image from 'next/image';
import React from 'react';

const BecomeSection = () => {
  return (
    <section className='px-5 xl:px-0 xl:container'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div className='bg-primary-400 p-7 rounded-md flex flex-col items-center'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 items-center justify-center'>
            <div className='space-y-4'>
              <h3 className='text-tertiary-800 font-bold'>
                Become An Instructor
              </h3>
              <p className='text-tertiary-600'>
                Top instructors from around the world teach millions of students
                on Mentoring
              </p>
            </div>
            <Image
              src='/images/become-02-1.png'
              width={300}
              height={300}
              alt='become'
            />
          </div>
        </div>
        <div className='bg-[#ffe88f] p-7 rounded-md'>
          <div className='grid grid-cols-1 justify-center lg:grid-cols-2 gap-2 items-center'>
            <div className='space-y-4'>
              <h3 className='text-tertiary-800 font-bold'>
                Transform Access To Education
              </h3>
              <p className='text-tertiary-600'>
                Create an account to receive our newsletter, course
                recommendations and promotions.
              </p>
            </div>
            <Image
              src='/images/become-01.png'
              width={200}
              height={200}
              alt='become'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSection;
