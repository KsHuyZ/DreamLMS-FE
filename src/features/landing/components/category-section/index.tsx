import React from 'react';

import CategoryCard from '@/features/landing/components/category-section/components/category-card';

import { ICategory } from '@/types';

interface Props {
  categories: ICategory[];
}

const CategorySection = ({ categories }: Props) => {
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
          </div>
          <span className='text-tertiary-600 max-w-[700px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </span>
        </div>
        <div className='grid grid-cols-1 gap-1 gap-y-4 lg:grid-cols-4 lg:gap-4'>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              src={category.image || '/images/react.webp'}
              category={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
