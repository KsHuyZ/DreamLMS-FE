import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { uploadVideo } from '@/api';

export const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);
  return {
    progress,
    setProgress,
    ...useMutation({
      mutationFn: (video: File) => uploadVideo(video, setProgress),
    }),
  };
};
