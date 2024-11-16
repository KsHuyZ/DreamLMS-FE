'use client';
import { EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react';
import React, { useState } from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

const InputSize = ['sm', 'md', 'lg'] as const;

type InputProps = {
  htmlFor?: string;
  label?: string;
  error?: unknown;
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  size?: (typeof InputSize)[number];
} & React.ComponentPropsWithRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      disabled: inputDisabled,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      htmlFor,
      error,
      type,
      className,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const disabled = inputDisabled;
    const commonClass =
      'text-gray-500 cursor-pointer z-auto w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3';

    const changeVisible = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className='transition duration-500 w-full'>
        {label ? (
          <label
            htmlFor={htmlFor}
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            {label}
          </label>
        ) : null}
        <div className='relative flex items-center'>
          {LeftIcon ? (
            <LeftIcon className='w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500' />
          ) : null}
          {type !== 'password' ? (
            RightIcon ? (
              <RightIcon className={commonClass} />
            ) : null
          ) : !visible ? (
            <EyeIcon className={commonClass} onClick={changeVisible} />
          ) : (
            <EyeOffIcon className={commonClass} onClick={changeVisible} />
          )}
          <input
            className={cn(
              'bg-gray-50 border px-5 border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors',
              error ? 'border-error focus:ring-error focus:border-error' : '',
              LeftIcon ? 'pl-7' : '',
              className
            )}
            disabled={disabled}
            type={type === 'password' && visible ? 'text' : type}
            ref={ref}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

export default Input;
