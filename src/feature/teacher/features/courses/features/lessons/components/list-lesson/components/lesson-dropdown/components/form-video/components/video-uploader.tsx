'use client';
import { XIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';

import { cn } from '@/lib/utils';

type InputProps = {
  htmlFor?: string;
  label?: string;
  error?: string;
  onClear?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithRef<'input'>;

const VideoUploader = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, htmlFor, name, onClear, onChange }) => {
    const [filePreview, setFilePreview] = useState<
      string | ArrayBuffer | null | undefined
    >(null);

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.value as unknown;
      const url = event.target.files;
      if (event && file && url && url.length > 0) {
        onChange(event);

        setFilePreview(URL.createObjectURL(url[0]));
      } else {
        setFilePreview(null);
      }
    };

    const handleClear = () => {
      setFilePreview(null);
      if (onClear) {
        onClear();
      }
    };

    return (
      <section className='container w-full mx-auto items-center'>
        {label ? (
          <label
            htmlFor={htmlFor}
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            {label}
          </label>
        ) : null}
        <div className='p-6 bg-gray-100 transition-colors duration-100 border-dashed border-2 border-gray-400 rounded-lg items-center w-full text-center cursor-pointer'>
          {filePreview ? (
            <div className='relative'>
              <div
                className='absolute -top-3 -right-3 p-1 bg-white z-30 rounded-full'
                onClick={handleClear}
              >
                <XIcon className='text-xs' />
              </div>
              <video controls className='w-fit m-auto' autoPlay>
                <source src={filePreview as string} />
              </video>
            </div>
          ) : (
            <>
              <input
                id='upload'
                type='file'
                className='hidden'
                name={name}
                accept='video/*'
                onChange={handleUpload}
              />
              <label htmlFor='upload' className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-8 h-8 text-gray-700 mx-auto mb-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                  />
                </svg>
                <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>
                  Upload video
                </h5>
                <p className='font-normal text-sm text-gray-400 md:px-6'>
                  Choose photo size should be less than{' '}
                  <b className='text-gray-600'>2GB</b>
                </p>
                <p className='font-normal text-sm text-gray-400 md:px-6'>
                  and should be in <b className='text-gray-600'>MP4</b> format.
                </p>
              </label>
            </>
          )}
        </div>
        <p className={cn('text-sm text-error', error && 'animate-fadetop')}>
          {error}
        </p>
      </section>
    );
  }
);

export default VideoUploader;
