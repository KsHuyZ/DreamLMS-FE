import Image from 'next/image';
import React from 'react';

interface CategoryCardProps {
  src: string;
  category: string;
  courseQuantity: number;
}

const CategoryCard = ({ src, category, courseQuantity }: CategoryCardProps) => {
  return (
    <div className='rounded-md p-4 flex flex-col space-y-4 items-center justify-between border group hover:bg-tertiary-800 duration-150 cursor-pointer'>
      <Image src={src} alt={category} width={95} height={95} />
      <p className='text-tertiary-800 group-hover:text-white font-bold text-xl'>
        {category}
      </p>
      <span className='text-tertiary-600 group-hover:text-white'>
        {courseQuantity} courses
      </span>
    </div>
  );
};

export default CategoryCard;
