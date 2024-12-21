'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <span
        className={cn('line-clamp-[10]', isExpanded && 'line-clamp-none')}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        className='text-primary-600 font-bold cursor-pointer'
      >
        {isExpanded ? 'Hide less' : 'Load more'}
      </span>
    </>
  );
};

export default Description;
