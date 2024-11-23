import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

const MentorSection = () => {
  return (
    <section className='bg-[url(/images/banner.png)] py-10'>
      <div className='px-5 xl:px-0 xl:container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <Image src='/images/share.png' width={867} height={650} alt='share' />
          <div className='flex flex-col space-y-10'>
            <h1 className='text-tertiary-800 font-bold'>
              Want to share your knowledge? Join us a Mentor
            </h1>
            <p className='text-tertiary-600 font-bold'>
              High-definition video is video of higher resolution and quality
              than standard-definition. While there is no standardized meaning
              for high-definition, generally any video.
            </p>
            <div className='flex flex-col space-y-6'>
              <div className='flex items-center space-x-4'>
                <BadgeCheck className='text-primary-600 w-5 h-5' />
                <p className='text-tertiary-600 font-bold text-xl'>
                  Best Courses
                </p>
              </div>
              <div className='flex items-center space-x-4'>
                <BadgeCheck className='text-primary-600 w-5 h-5' />
                <p className='text-tertiary-600 font-bold text-xl'>
                  Top rated Instructors
                </p>
              </div>
            </div>
            <div>
              <Button>Read more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
