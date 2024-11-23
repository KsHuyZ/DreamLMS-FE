import React from 'react';

import { Button } from '@/components/ui/button';

import CategoryCard from '@/features/landing/components/category-section/components/category-card';

const CategorySection = () => {
  return (
    <section className='px-5 xl:px-0 xl:container'>
      <div className='flex flex-col space-y-10'>
        <div className='flex flex-col space-x-3 space-y-3'>
          <div className='flex justify-between items-start flex-col lg:flex-row lg:items-center space-y-4'>
            <div className='flex flex-col space-y-3'>
              <span className='text-primary-800 text-xl font-bold'>
                Favourite Course
              </span>
              <h1 className='text-tertiary-800 text-4xl font-extrabold'>
                Top Category
              </h1>
            </div>
            <Button
              className='text-tertiary-800 border border-tertiary-800 rounded-full'
              variant='outline'
            >
              All categories
            </Button>
          </div>
          <span className='text-tertiary-600 max-w-[700px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </span>
        </div>
        <div className='grid grid-cols-1 gap-1 gap-y-4 lg:grid-cols-4 lg:gap-4'>
          <CategoryCard
            src='/images/graphql.png'
            category='GraphQL'
            courseQuantity={4}
          />
          <CategoryCard
            src='/images/angular.png'
            category='Angular'
            courseQuantity={4}
          />
          <CategoryCard
            src='/images/react.webp'
            category='React'
            courseQuantity={4}
          />
          <CategoryCard
            src='/images/docker.webp'
            category='Docker'
            courseQuantity={4}
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
