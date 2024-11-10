import dynamic from 'next/dynamic';
import React, { memo } from 'react';

import Spinner from '@/components/loading/spinner';

import { TUnit } from '@/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface IVideoProps {
  selectUnit: TUnit;
}

const Video = ({ selectUnit }: IVideoProps) => {
  return (
    <ReactPlayer
      fallback={
        <div className='w-full h-96 flex items-center justify-center'>
          <Spinner />
        </div>
      }
      url={selectUnit.video as unknown as string}
      playing
      pip
      autoPlay
      width='100%'
      controls
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#0000',
      }}
    >
      <source
        autoFocus
        src={selectUnit.video as unknown as string}
        type='video/mp4'
      />
    </ReactPlayer>
  );
};

export default memo(Video);
