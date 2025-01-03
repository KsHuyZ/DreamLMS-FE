'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';

import Spinner from '@/components/loading/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useVideo } from '@/features/courses/features/course-detail/hooks';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading() {
    return <Spinner />;
  },
});

interface IModalPreviewProps {
  img: string;
  name: string;
  videoId: string;
}

const ModalPreview = ({ img, name, videoId }: IModalPreviewProps) => {
  const { data: video, isLoading } = useVideo(videoId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative'>
          {videoId && (
            <div className='absolute bg-gradient-to-t w-full h-full from-[#2d2f31e6] cursor-pointer rounded-md'>
              <div className='flex h-full items-center justify-center'>
                <IoPlayCircleOutline className='w-10 h-10 text-white' />
              </div>
            </div>
          )}
          <Image
            src={img}
            width={500}
            height={200}
            className='rounded-md'
            alt='Course preview'
          />
        </div>
      </DialogTrigger>
      <DialogContent className='min-w-fit duration-200'>
        <DialogHeader>
          <DialogDescription>Course Preview</DialogDescription>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='h-10 w-full justify-center flex items-center'>
            <Spinner />
          </div>
        ) : (
          <ReactPlayer
            url={video}
            playing={true}
            light
            pip
            autoPlay
            muted={false}
            controls
            style={{
              borderRadius: 20,
            }}
          >
            <source autoFocus src={video} type='video/hls' />
          </ReactPlayer>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
