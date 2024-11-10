'use client';
import { XIcon } from 'lucide-react';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { ITag } from '@/types';

type InputProps = {
  htmlFor?: string;
  label?: string;
  error?: string;
  setInput: Dispatch<SetStateAction<string>>;
  items: ITag[];
  values: ITag[];
  value: string;
  onChange: (value: ITag[]) => void;
} & React.ComponentPropsWithRef<'input'>;

const InputMultiple = ({
  items,
  value,

  setInput,
  label,
  onChange,
  ...props
}: InputProps) => {
  const [categoriesSelected, setCategoriesSelected] = useState<ITag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddPermission = (newCategory: ITag) => {
    setCategoriesSelected((prev) => [...prev, newCategory]);
    setInput('');
  };

  function clearOptions() {
    onChange([]);
  }

  // function selectOption(option: ITag) {
  //   if (value.includes(option.name)) {
  //     onChange(value.filter((o) => o !== option));
  //   } else {
  //     onChange([...value, option]);
  //   }
  // }

  const handleDeletePermission = (permissionDel: ITag) => {
    const data = categoriesSelected.filter(
      (permisson, index) => permisson.id !== permissionDel.id
    );
    setCategoriesSelected(data);
  };

  const handleAddCategory = () => {
    const category = categoriesSelected.map((cate) => cate.id);
  };

  return (
    <div>
      {label ? (
        <label className='block mb-2 text-sm font-medium text-gray-900 '>
          {label}
        </label>
      ) : null}
      <div
        className='relative bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors'
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        <span className='flex-grow flex gap-2 flex-wrap'>
          {categoriesSelected.map((category, index) => (
            <div
              className='flex items-center border border-gray-300 rounded px-2 py-1 gap-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:border-blue-500'
              key={index}
            >
              <span>{category.name}</span>
              <span
                onClick={() => handleDeletePermission(category)}
                className='cursor-pointer'
              >
                <XIcon size={15} />
              </span>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearOptions();
            }}
            className='text-red-500 bg-none border-none outline-none cursor-pointer p-0'
          >
            &times;
          </button>
        </span>
        <div className='bg-gray-300 w-0.5 h-full'></div>
        <div className='border-t-0.5 border-gray-300 transform -translate-y-2 border-solid w-0 h-0'></div>
        <input
          type='text'
          className='bg-gray-50 border-none focus:border-none focus:ring-0 focus:outline-none text-gray-900 sm:text-sm rounded-lg block p-2.5 transition-colors max-w-fit'
          placeholder='Tags'
          onChange={(e) => setInput(e.target.value)}
          value={value}
        />
      </div>
      <ul className='absolute top-full bg-white flex flex-col rounded w-full shadow-md z-20'>
        {items
          .filter((item) => {
            const searchTerm = (value as string).toLowerCase();
            const permissionName = item.name.toLowerCase();
            return (
              searchTerm &&
              permissionName.includes(searchTerm) &&
              permissionName !== searchTerm
            );
          })
          .slice(0, 10)
          .map((item) => {
            const index = categoriesSelected.findIndex(
              (user) => user.id === item.id
            );
            if (index === -1) {
              return (
                <li
                  onClick={() => handleAddPermission(item)}
                  className='w-full p-2 hover:bg-gray-200 cursor-pointer'
                  key={item.name}
                >
                  <div>
                    <div className=''>{item.name}</div>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default InputMultiple;
