'use client';
import { ArrowRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const disabled = value.length <= 3;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !disabled && router.push(`/courses/?name=${value}`);
  };
  return (
    <form
      className='relative flex items-center max-w-[740px]'
      onSubmit={onSubmit}
    >
      <Search className='text-primary-600 w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3' />
      <Button
        className='text-gray-500 cursor-pointer z-auto absolute top-1/2 transform -translate-y-1/2 right-3 rounded-full duration-300'
        disabled={disabled}
      >
        <ArrowRight className='text-white w-4 h-4' />
      </Button>
      <input
        placeholder='Search School, Online educational centers, etc...'
        className='bg-gray-50 p-4 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full transition-colors pl-10 rounded-full'
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
