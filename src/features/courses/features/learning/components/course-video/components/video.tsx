import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import Spinner from '@/components/loading/spinner';

import { useVideo } from '@/features/courses/features/course-detail/hooks';
import { useCompletedVideo } from '@/features/courses/features/learning/components/course-video/hooks';

import { TUnit } from '@/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface IVideoProps {
  selectUnit: TUnit;
  onNextUnit: () => void;
  refetch: () => void;
}

const Loading = () => (
  <div className='w-full h-96 flex items-center justify-center'>
    <Spinner />
  </div>
);

const Video = ({ selectUnit, onNextUnit, refetch }: IVideoProps) => {
  const { data: url, isLoading } = useVideo(selectUnit.video?.id);
  const { mutateAsync: completedVideo } = useCompletedVideo(
    selectUnit.video?.id
  );
  const router = useRouter();

  const onEnded = useCallback(async () => {
    onNextUnit();
    await completedVideo();
    refetch();
    router.refresh();
  }, [onNextUnit, completedVideo, refetch, router]);

  return isLoading ? (
    <Loading />
  ) : (
    <ReactPlayer
      fallback={<Loading />}
      url={url}
      playing
      pip
      autoPlay
      width='100%'
      controls
      onEnded={onEnded}
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#0000',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
    >
      <source autoFocus src={url} type='video/mp4' />
    </ReactPlayer>
  );
};

export default Video;
